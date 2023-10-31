class TransactionController {
    list(){
        return [{entity: "transaction 1"}, {entity: "transaction 2"}];
    }
}

module.exports = new TransactionController()
