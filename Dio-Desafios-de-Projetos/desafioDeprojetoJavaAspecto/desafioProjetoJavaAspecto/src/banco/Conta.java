package banco;


public abstract class Conta {
	protected double saldo;
	
	public void depositar(double valor) {
		saldo += valor;
		System.out.println("Deposito de R$" + valor + "realizado com sucesso.");
	}
	
	public void sacar(double valor) {
		if (saldo >= valor) {
			saldo -= valor;
			System.out.println("Saque de R$" + valor + " realizado com sucesso.");
		} else {
			System.out.println("Erro: Saldo insuficiente para saque.");
		}
	}
	
	public double getSaldo() {
		return saldo;
	}

}








