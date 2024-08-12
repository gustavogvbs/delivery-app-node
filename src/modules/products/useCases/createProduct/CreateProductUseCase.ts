import { ICategoryRepository } from "@repositories/ICategoryRepository";
import { IProductRepository } from "@repositories/IProductRepository";
import { ITenantRepository } from "@repositories/ITenantRepository";
import { IUserRepository } from "@repositories/IUserRepository";

import { AppError } from "@errors/AppErro";
import { FormatterResponse } from "@utils/FormatterResponse";
import { IJwtApi } from "@utils/JwtApi";
import { SlugGenereted } from "@utils/SlugGenereted";

import { imageJsonSchema } from "@type/image-json";

import {
  CreateProductData,
  CreateProductRelationCategory,
  CreateProductRequest,
  CreateProductResponse,
} from "../../dtos/CreateProductDTO";

export class CreateProductUseCase {
  constructor(
    private userRepository: IUserRepository,
    private categoryRepository: ICategoryRepository,
    private tenantRepository: ITenantRepository,
    private productRepository: IProductRepository,
    private formatterResponse: FormatterResponse,
    private jwt: IJwtApi,
  ) {}
  async execute(data: CreateProductRequest): Promise<CreateProductResponse> {
    const token = this.jwt.verify(data.token);

    const userAuth = await this.userRepository.findById(token.id, ["tenant"]);

    if (!userAuth || !userAuth.tenant)
      throw new AppError("Usuarío não encontrado!", 404);

    const categoryAlreadExist = await this.categoryRepository.findById(
      data.categoryId,
    );
    const tenantAlreadExist = await this.tenantRepository.findById(
      userAuth.tenant.id,
    );

    if (!categoryAlreadExist || !tenantAlreadExist)
      throw new AppError("Categoria ou Estabelecimento não existe", 400);
    if (categoryAlreadExist.tenantId !== tenantAlreadExist.id)
      throw new AppError("Categoria não coincide com o Estabelecimento", 400);

    /*  console.log("Ola");
    console.log(getUserPermission(userAuth.id, userAuth.role as USERS_ROLES));
    const userPermission = getUserPermission(
      userAuth.id,
      userAuth.role as USERS_ROLES,
    );

    if (!userPermission.can("manage", "Products"))
      throw new AppError("Forbidden", 403); */

    const slug = SlugGenereted({
      name: data.name,
    });

    const productAlreadExists = await this.productRepository.getBySlug(
      slug,
      tenantAlreadExist.id,
    );
    if (productAlreadExists)
      throw new AppError("Nome de produto ja registrado", 400);

    const product = await this.productRepository.createProduct(
      {
        categoryId: data.categoryId,
        description: data.description,
        name: data.name,
        price: parseFloat(data.price),
        tenantId: tenantAlreadExist.id,
        slug,
        image: data.image,
      },
      data.query,
    );

    if (!product.category) throw new AppError("categoria não encontrada", 404);
    const { category } = product;

    const relationResult =
      this.formatterResponse.execute<CreateProductRelationCategory>(
        category.id,
        {
          name: category.name,
          slug: category.slug,
          created_at: category.created_at,
          updated_at: category.updated_at,
        },
      );

    const result = this.formatterResponse.execute<CreateProductData>(
      product.id,
      {
        name: product.name,
        slug: product.slug,
        price: product.price,
        image: imageJsonSchema.parse(product.image),
        description: product.description,
        created_at: product.created_at,
        updated_at: product.updated_at,
        category: relationResult.data,
      },
    );

    return result;
  }
}
