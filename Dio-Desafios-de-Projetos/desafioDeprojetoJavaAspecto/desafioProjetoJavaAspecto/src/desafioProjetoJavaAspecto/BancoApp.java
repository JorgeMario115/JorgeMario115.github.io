package desafioProjetoJavaAspecto;

import banco.*;
import java.util.Scanner;
import banco.ContaSalario;

public class BancoApp {

	public static void main(String[] args) {
		Scanner scanner = new Scanner(System.in);
		Conta conta = null;
		
		while (true) {
				System.out.println("\nBem-vindo ao Banco!");
				System.out.println("Escolha uma opção:");
				System.out.println("1- Conta Corrente");
				System.out.println("2- Conta Salário");
				System.out.println("3- Conta Investimento");
				System.out.println("4- Conta Poupança");
				System.out.println("5- Sair");
				int opcao = scanner.nextInt();
			
			
			switch (opcao) {
				case 1:
					conta = new ContaCorrente();
					break;
				case 2:
					conta = new ContaSalario();
					break;
				case 3:
					conta = new ContaInvestimento();
					break;
				case 4:
					conta = new ContaPoupanca();
					break;
				case 5:
					System.out.println("Obrigado por usar o sistema bancário. Até logo!");
					scanner.close();
					return;
				default:
					System.out.println("Opção inválida. Tente novamente");
					continue;
			}
			
			while (true) {
				System.out.println("\nEscolha uma operação:");
				System.out.println("1- Depositar");
				System.out.println("2- Sacar");
				System.out.println("3- Ver Saldo");
				System.out.println("4- Voltar ao menu inicial");
				int operacao = scanner.nextInt();
				
				switch (operacao) {
				
				case 1:
					System.out.println("Digite o valor para depositar: R$");
					double valorDeposito = scanner.nextDouble();
					conta.depositar(valorDeposito);
					break;
				case 2:
					System.out.println("Digite o valor para sacar: R$");
					double valorSaque = scanner.nextDouble();
					conta.sacar(valorSaque);
					break;
				case 3:
					System.out.println("Saldo atual: R$" + conta.getSaldo());
					break;
				case 4:
					System.out.println("Voltando ao menu inicial...");
					break;					
				default:
					System.out.println("Opção inválida. Tente novamente.");
				}
				
				if (operacao == 4) {
					break;
				}
				
			}
		
		
		}

	}

}
