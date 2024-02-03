## Controller

receber = idTenant, name

## UseCase

- verificar se idTenant é valido
- gerar o slug apartir do retorno do tenat.slug + name
- criar uma nova categoria na tabela category conectando com o idTenant
- return a resposta da criação da categoria

### Atenção

- dentro de useCase vc precisa ter uma variavel privada contro do contructor com os seguintes itens
  -- ICategoryRepository
  -- ITenantRepository
