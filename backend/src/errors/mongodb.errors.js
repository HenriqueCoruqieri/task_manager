const notFoundError = (res) => {
  return res.status(404).send("Este dado não foi encontrado no banco de dados")
}

const objectIdCastError = (res) => {
  return res
    .status(500)
    .send("Ocorreu um erro ao recuperar esse dado no banco de dados")
}

const passwordError = (res) => {
  return res.status(500).send("Senha incorreta")
}

module.exports = {
  notFoundError,
  objectIdCastError,
  passwordError,
}
