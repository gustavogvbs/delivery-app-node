import { ICategoryRepository } from "@repositories/ICategoryRepository";
import { IProductRepository } from "@repositories/IProductRepository";
import { ITenantRepository } from "@repositories/ITenantRepository";

import { AppError } from "@errors/AppErro";
import { FormatterResponse } from "@utils/FormatterResponse";
import { SlugGenereted } from "@utils/SlugGenereted";

import {
  CreateProductData,
  CreateProductRequest,
  CreateProductResponse,
} from "../../dtos/CreateProductDTO";

export class CreateProductUseCase {
  constructor(
    private categoryRepository: ICategoryRepository,
    private tenantRepository: ITenantRepository,
    private productRepository: IProductRepository,
    private formatterResponse: FormatterResponse,
  ) {}
  async execute(data: CreateProductRequest): Promise<CreateProductResponse> {
    const categoryAlreadExist = await this.categoryRepository.findById(
      data.categoryId,
    );
    const tenantAlreadExist = await this.tenantRepository.findById(
      data.tenantId,
    );

    if (!categoryAlreadExist || !tenantAlreadExist)
      throw new AppError("Categoria ou Estabelecimento não existe", 400);
    if (categoryAlreadExist.tenantId !== tenantAlreadExist.id)
      throw new AppError("Categoria não coincide com o Estabelecimento", 400);

    const slug = SlugGenereted({
      name: data.name,
      prefix: categoryAlreadExist.name,
    });

    const productAlreadExists = await this.productRepository.getBySlug(slug);
    if (productAlreadExists) throw new AppError("Slug Ja existe", 400);

    const product = await this.productRepository.createProduct({
      ...data,
      slug,
    });
    const formatter = await this.formatterResponse.execute<CreateProductData>(
      product.id,
      {
        created_at: product.created_at,
        description: product.description,
        image: product.image as string,
        name: product.name,
        price: product.price,
        slug: product.slug,
        updated_at: product.updated_at,
      },
    );

    return formatter;
  }
}
