## Orders ->

### -> createOrder

- Precisa receber as seguintes informações:

- total == string
- typePayment == enum[cartão, dinheiro, pix]
- payback = number
- troco == string
- products == Json
- idTenant == string
- idUser == string

relacionar o pedido com o tenant e o user atravez do id

-> getOrder

- Precisa receber as seguintes informações:

  - id
  - idUser

verificar userId é igual ao id do client ou do estabelecimento se for retorna o pedido se não retorna erro

-> getAllOrders
