### Usuário

- Id: String @unico
- Nome: String
- Email String @unico
- Senha: String @password
- Tipo: Enun = ADMIN, DEV, TENANT, CLIENT
- ProfileId: Relação? [ Profile ] 1 == 1
- TenantId: Relação? [ Tenant ] 1 == 1

### Profile

- Id: String @unico
- EndereçosId: Relação [ Endereços ] 1 == +
- Telefone: String
- PedidosId: Relação [ Pedidos ] 1 == +
- Image: File

### Tenant

- Id: String @unico
- Slug: String @unico
- Name: String
- PrimaryColor: String
- Phone: String
- ProductId: Relação [ Products ] 1 == +
- CategoryId: Relação [ Categories ] 1 == +

### Products

- Id: String @unico
- Slug: String @unico
- Name: String
- Price: Number
- Description: String
- Image: File
- CategoryId: Relação [ Category ] 1 == 1

### Category

- Name
- Id
- Image
- TenantId: Relação [ Tenant ] 1 == 1
- ProductsId: Relação [ Products ] 1 == +

### Adress

- Id
- Cep
- Cidade
- Bairro
- Rua
- Numero
- Complmento?
- ProfileId: Relação [ Profile ] 1 == 1

### Image

- Id
- Name
- Url
