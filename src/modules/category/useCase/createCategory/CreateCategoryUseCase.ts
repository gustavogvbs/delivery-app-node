import {
  CreateCategoryData,
  CreateCategoryRequest,
  CreateCategoryResponse,
} from "@modules/category/dtos/CreateCategoryDTO";
import { ICategoryRepository } from "@repositories/ICategoryRepository";
import { ITenantRepository } from "@repositories/ITenantRepository";

import { AppError } from "@errors/AppErro";
import { FormatterResponse } from "@utils/FormatterResponse";
import { IJwtApi } from "@utils/JwtApi";
import { SlugGenereted } from "@utils/SlugGenereted";

import { JWTZod } from "@type/jwtType";

export class CreateCategoryUseCase {
  constructor(
    private categoryRepository: ICategoryRepository,
    private tenantRepository: ITenantRepository,
    private formatterResponse: FormatterResponse,
    private jwt: IJwtApi,
  ) {}
  async execute(data: CreateCategoryRequest): Promise<CreateCategoryResponse> {
    const decoded = JWTZod.safeParse(this.jwt.decoded(data.token));
    if (!decoded.success) throw new AppError("Usuario não esta logado", 403);

    const tenantAuth = await this.tenantRepository.findByUserId(
      decoded.data.id,
    );

    if (!tenantAuth) {
      throw new AppError("Estabelecimento não encontrado", 400);
    }
    const slug = SlugGenereted({
      name: data.name,
    });

    const categoryAlreadExist = await this.categoryRepository.findBySlug(
      slug,
      tenantAuth.id,
    );

    if (categoryAlreadExist && categoryAlreadExist.tenantId === tenantAuth.id)
      throw new AppError("O slug da categoria ja foi registrado", 400);

    const category = await this.categoryRepository.createCategory({
      name: data.name,
      tenantId: tenantAuth.id,
      slug,
    });

    const result = this.formatterResponse.execute<CreateCategoryData>(
      category.id,
      {
        name: category.name,
        slug: category.slug,
        created_at: category.created_at,
        updated_at: category.updated_at,
      },
    );
    return result;
  }
}
