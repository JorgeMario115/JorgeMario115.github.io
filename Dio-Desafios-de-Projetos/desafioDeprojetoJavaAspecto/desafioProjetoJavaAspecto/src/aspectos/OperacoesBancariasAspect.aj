package aspectos;

public aspect OperacoesBancariasAspect {

    // Definindo um ponto de corte para o método depositar
    pointcut deposito(double valor): execution(* banco.Conta.depositar(..)) && args(valor);

    // Definindo um ponto de corte para o método sacar
    pointcut saque(double valor): execution(* banco.Conta.sacar(..)) && args(valor);

    // Definindo um ponto de corte para o método getSaldo
    pointcut consultaSaldo(): execution(* banco.Conta.getSaldo());

    // Definindo um ponto de corte para saques que resultam em exceção
    pointcut saqueComErro(): execution(* banco.Conta.sacar(..)) && !within(OperacoesBancariasAspect);

    // Antes de executar o depósito
    before(double valor): deposito(valor) {
        System.out.println("[LOG] Iniciando depósito de: R$" + valor);
    }

    // Antes de executar o saque
    before(double valor): saque(valor) {
        System.out.println("[LOG] Iniciando saque de: R$" + valor);
    }

    // Depois de executar a consulta de saldo
    after() returning(double saldo): consultaSaldo() {
        System.out.println("[LOG] Consulta de saldo realizada. Saldo atual: R$" + saldo);
    }

    // Depois que uma exceção é lançada no método sacar
    after() throwing(Exception e): saqueComErro() {
        System.out.println("[ERRO] Saldo insuficiente para realizar o saque.");
    }
}
