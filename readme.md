# Prosimos Passos

Valos popular o nosso banco de dados(Criar as demais tabelas) caso tenha alguma duvida, puxe pela documentação do prisma
links abaixo:
Sobre a criação de tabelas(Models) = https://www.prisma.io/docs/orm/prisma-schema/data-model/models
Sobre a definição de colunas(Filds) = https://www.prisma.io/docs/orm/prisma-schema/data-model/models#defining-fields
Sobre a definição de attributos = https://www.prisma.io/docs/orm/prisma-schema/data-model/models#defining-attributes

qualquer duvida que voçe tenha anote e me mande no discord, ou algo que vc não consiga fazer deixe de lado que nós veremos isso juntos

A pós criar as novas tabelas seguindo a documentação do prisma
Rode o comando **npx prisma migrate dev** vai pedir para que vc informe o nome da migration, colocar == initial
Caso de erro, apague a pasta migration e o arquivo dev.db dentro da pasta prisma e rode o comando acima novamente

E para verificar se o banco de dados foi certinho rode o comando **npx prisma studio**

### Usuário

- Id: String @unico
- Nome: String
- Email String @unico
- Senha: String
- Role: Enun = ADMIN, DEV, TENANT, CLIENT

Ignorar esses campos

- ProfileId: Relação? [ Profile ] 1 == 1
- TenantId: Relação? [ Tenant ] 1 == 1

### Profile

- Id: String @unico
- Telefone: String

Ignorar esses campos

- Image: File
- PedidosId: Relação [ Pedidos ] 1 == +
- EndereçosId: Relação [ Endereços ] 1 == +

### Tenant

- Id: String @unico
- Slug: String @unico
- Name: String
- PrimaryColor: String
- Phone: String

Ignorar esses campos

- ProductId: Relação [ Products ] 1 == +
- CategoryId: Relação [ Categories ] 1 == +

### Products

- Id: String @unico
- Slug: String @unico
- Name: String
- Price: Number
- Description: String
- created_at DateTime @default(now())
- updated_at DateTime @updatedAt

Ignorar esses campos

- Image: File
- CategoryId: Relação [ Category ] 1 == 1

### Category

- Id String @unico
- Name String
- created_at DateTime @default(now())
- updated_at DateTime @updatedAt

Ignorar esses campos

- Image
- TenantId: Relação [ Tenant ] 1 == 1
- ProductsId: Relação [ Products ] 1 == +

### Adress

- Id String @unico
- Cep String
- Cidade String
- Bairro String
- Rua String
- Numero String
- Complmento? String
- created_at DateTime @default(now())
- updated_at DateTime @updatedAt

  Ignorar esses campos

- ProfileId: Relação [ Profile ] 1 == 1

### Image

- Id String @unico
- Name String
- Url String
- Content_type String
- created_at DateTime @default(now())
- updated_at DateTime @updatedAt
