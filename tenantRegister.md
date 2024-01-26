# Route Tenant Register

Quando a rota http://localhost:8080/register/tenant for chamada precisa seguir os proximos passos:

- Verificar se esta vindo os seguintes valores pelo arquivo de Controller (**tenant**[_name, primaruColor, phone_], **user**[_name, email, password_])
- Passar esses dados para o arquivo de useCase que vai tratar esses dados e retornar uma respota ao usuario/tenant

### Regras a seguir

- Verificar se ja não existe um usuario com aquele email, caso aja retornar um _throw new AppError("Usuario ja existe")_
- Abrir uma função de _$transaction_(essa função serve para caso umas das requisições de criar uma novo User ou novo Tenant falhe, nenhuma das requisições sera persistida no banco de dados)
- inserir um novo usuario na tabela user
- inserir um novo inquelino na tabela tenant conectando ela a tabela de user
- então retornar o user criado!
- na função _$transaction_ passar um catch(Caso aja algum erro, o catch e chamado para tratar o erro) passando uma função que retorna _throw new AppError("error 500", 500)_
- em seguida gerar o token de acesso atraves da utils/JwtApi()
- então retorna um object{user, token}

### Pontos a se atentar

- Devemos criar uma relação entre User e Tenant
- Devemos verificar se quem esta fazendo o register é um ADMIN
- Devemos criar a rota de registro em ./routes/register.router.ts passando "/tenant"
