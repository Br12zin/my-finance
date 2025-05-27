"use client";

import { useForm, SubmitHandler } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const schema = z.object({
  name: z.string().min(1, { message: "Nome é obrigatório" }),
  cpf: z.string().length(11, { message: "CPF é obrigatório" }),
  rg: z.string().length(9, { message: "RG é obrigatório" }),
  data_nascimento: z
    .coerce.date()
    .min(new Date("1900-01-01"), { message: "Data de nascimento inválida" })
    .max(new Date(), { message: "Data de nascimento inválida" }),
  telefone: z.string().min(11, { message: "Telefone é obrigatório" }),
  email: z.string().email({ message: "Email inválido" }),
  endereco: z
    .string()
    .max(50, { message: "Endereço é obrigatório e deve ter até 50 caracteres" })
    .regex(/^[A-Za-zÀ-ú\s]+$/, { message: "Endereço deve conter apenas letras e espaços" }), 
    // Regex (ou Expressão Regular) é uma sequência de caracteres que forma um padrão de busca, usado principalmente para encontrar, extrair ou manipular 
    // texto de forma poderosa e flexível.

  complemento: z.string().optional(),
  banco: z.string().min(1, { message: "Banco é obrigatório" }),
  agencia: z.string().length(4, { message: "Agência deve ter exatamente 4 dígitos" }),
  conta: z.string().length(5, { message: "Conta não encontrada" }),
  digito_conta: z.string().length(1, { message: "Dígito obrigatório" }),
  tipo_conta: z.enum(["corrente", "poupança"], { message: "Tipo de conta é obrigatório" }),
});

type IFormInput = z.infer<typeof schema>;

// zodResolver converte as validações Zod para o formato que react-hook-form entende
export default function ClientFinance() {
  const {
    register,  // register: Função que conecta cada input ao react-hook-form
    handleSubmit, // handleSubmit: Função que lida com o envio do formulário
    formState: { errors },
    reset,
  } = useForm<IFormInput>({ // useForm: Hook da biblioteca react-hook-form que gerencia todo o estado do formulário
    // IFormInput: Tipo TypeScript derivado do schema Zod
    resolver: zodResolver(schema), // resolver: zodResolver(schema): Integração com Zod para validação
  }); // O schema é o objeto de validação Zod que você criou

  const onSubmit: SubmitHandler<IFormInput> = (data) => {  // Parâmetro data: Contém todos os valores do formulário já validados e tipados
    // SubmitHandler<IFormInput>: Indica que é uma função que recebe dados no formato IFormInput
    console.log("Dados enviados: ", data);
    alert("Cadastro realizado com sucesso!");
    reset();
  };

// Usuário preenche o formulário
// Ao enviar, handleSubmit valida os dados usando o schema Zod
// Se válido, chama onSubmit com os dados
// Se inválido, preenche o objeto errors com as mensagens apropriadas
// Após sucesso, limpa o formulário

  return (
    <div suppressHydrationWarning className="max-w-3xl mx-auto p-10 bg-[#121212] rounded-xl shadow-lg mt-6 font-sans text-white  ">
      <h2  className="text-4xl font-extrabold mb-10 text-center gradient-gold-shine" >
        Cadastro Bancário
      </h2>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
        {/* Dados Pessoais */}
        <fieldset className="border border-[#bfa14a] p-8 rounded-lg">
          {/*<fieldset> É um elemento HTML usado para agrupar logicamente vários controles de formulário e rótulos */}
          {/* Está sendo usado para os títulos "Dados Pessoais" e "Dados Bancários" */}

          <legend suppressHydrationWarning
            className="text-2xl font-semibold mb-6"
            style={{ color: "#bfa14a" }}
          >
             {/* <legend> */}
            {/* Fornece um título/descrição para o grupo de campos definido pelo <fieldset> */}

            Dados Pessoais
          </legend>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Nome */}
            <div>
              <label className="block mb-2 font-medium" htmlFor="name">
                Nome
              </label>
              <input
                {...register("name")}
                id="name"
                className={`w-full rounded-md bg-[#1e1e1e] border border-[#bfa14a] px-3 py-2 text-white placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#bfa14a]`}
                placeholder="Seu nome completo"
              />
              {errors.name && (
                <p className="mt-1 text-sm text-red-500">{errors.name.message}</p>
              )}
            </div>

            {/* CPF */}
            <div>
              <label className="block mb-2 font-medium" htmlFor="cpf">
                CPF
              </label>
              <input
                {...register("cpf")}
                id="cpf"
                maxLength={11}
                className={`w-full rounded-md bg-[#1e1e1e] border border-[#bfa14a] px-3 py-2 text-white placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#bfa14a]`}
                placeholder="Apenas números"
              />
              {errors.cpf && (
                <p className="mt-1 text-sm text-red-500">{errors.cpf.message}</p>
              )}
            </div>

            {/* RG */}
            <div>
              <label className="block mb-2 font-medium" htmlFor="rg">
                RG
              </label>
              <input
                {...register("rg")}
                id="rg"
                maxLength={9}
                className={`w-full rounded-md bg-[#1e1e1e] border border-[#bfa14a] px-3 py-2 text-white placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#bfa14a]`}
                placeholder="Apenas números"
              />
              {errors.rg && (
                <p className="mt-1 text-sm text-red-500">{errors.rg.message}</p>
              )}
            </div>

            {/* Data de Nascimento */}
            <div>
              <label className="block mb-2 font-medium" htmlFor="data_nascimento">
                Data de Nascimento
              </label>
              <input
                type="date"
                {...register("data_nascimento")}
                id="data_nascimento"
                className={`w-full rounded-md bg-[#1e1e1e] border border-[#bfa14a] px-3 py-2 text-white placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#bfa14a]`}
              />
              {errors.data_nascimento && (
                <p className="mt-1 text-sm text-red-500">
                  {errors.data_nascimento.message}
                </p>
              )}
            </div>

            {/* Telefone */}
            <div>
              <label className="block mb-2 font-medium" htmlFor="telefone">
                Telefone
              </label>
              <input
                {...register("telefone")}
                id="telefone"
                maxLength={11}
                className={`w-full rounded-md bg-[#1e1e1e] border border-[#bfa14a] px-3 py-2 text-white placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#bfa14a]`}
                placeholder="Número com DDD"
              />
              {errors.telefone && (
                <p className="mt-1 text-sm text-red-500">{errors.telefone.message}</p>
              )}
            </div>

            {/* Email */}
            <div>
              <label className="block mb-2 font-medium" htmlFor="email">
                Email
              </label>
              <input
                type="email"
                {...register("email")}
                id="email"
                className={`w-full rounded-md bg-[#1e1e1e] border border-[#bfa14a] px-3 py-2 text-white placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#bfa14a]`}
                placeholder="exemplo@dominio.com"
              />
              {errors.email && (
                <p className="mt-1 text-sm text-red-500">{errors.email.message}</p>
              )}
            </div>

            {/* Endereço */}
            <div className="md:col-span-1">
              <label className="block mb-2 font-medium" htmlFor="endereco">
                Endereço
              </label>
              <input
                {...register("endereco")}
                id="endereco"
                className={`w-full rounded-md bg-[#1e1e1e] border border-[#bfa14a] px-3 py-2 text-white placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#bfa14a]`}
                placeholder="Rua, número, bairro"
              />
              {errors.endereco && (
                <p className="mt-1 text-sm text-red-500">{errors.endereco.message}</p>
              )}
            </div>

            {/* Complemento */}
            <div className="md:col-span-1">
              <label className="block mb-2 font-medium" htmlFor="complemento">
                Complemento
              </label>
              <input
                {...register("complemento")}
                id="complemento"
                className={`w-full rounded-md bg-[#1e1e1e] border border-[#bfa14a] px-3 py-2 text-white placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#bfa14a]`}
                placeholder="Apto, bloco, etc (opcional)"
              />
            </div>
          </div>
        </fieldset>

        {/* Dados Bancários */}
        <fieldset className="border border-[#bfa14a] p-8 rounded-lg">
          <legend
          suppressHydrationWarning
          className="text-2xl font-semibold mb-6"
          style={{ color: "#bfa14a" }}
          >
            Dados Bancários
          </legend>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Agência */}
            <div>
              <label className="block mb-2 font-medium" htmlFor="agencia">
                Agência
              </label>
              <input
                {...register("agencia")}
                id="agencia"
                maxLength={4}
                className={`w-full rounded-md bg-[#1e1e1e] border border-[#bfa14a] px-3 py-2 text-white placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#bfa14a]`}
                placeholder="0000"
              />
              {errors.agencia && (
                <p className="mt-1 text-sm text-red-500">{errors.agencia.message}</p>
              )}
            </div>

            {/* Conta e Dígito */}
            <div className="flex gap-4">
              <div className="flex-1">
                <label className="block mb-2 font-medium" htmlFor="conta">
                  Conta
                </label>
                <input
                  {...register("conta")}
                  id="conta"
                  maxLength={5}
                  className={`w-full rounded-md bg-[#1e1e1e] border border-[#bfa14a] px-3 py-2 text-white placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#bfa14a]`}
                  placeholder="00000"
                />
                {errors.conta && (
                  <p className="mt-1 text-sm text-red-500">{errors.conta.message}</p>
                )}
              </div>

              <div className="w-20">
                <label className="block mb-2 font-medium" htmlFor="digito_conta">
                  Dígito
                </label>
                <input
                  {...register("digito_conta")}
                  id="digito_conta"
                  maxLength={1}
                  className={`w-full rounded-md bg-[#1e1e1e] border border-[#bfa14a] px-3 py-2 text-center text-white placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#bfa14a]`}
                  placeholder="0"
                />
                {errors.digito_conta && (
                  <p className="mt-1 text-sm text-red-500">{errors.digito_conta.message}</p>
                )}
              </div>
            </div>

            {/* Banco */}
            <div>
              <label className="block mb-2 font-medium" htmlFor="banco">
                Banco
              </label>
              <select
                {...register("banco")}
                id="banco"
                className={`w-full rounded-md bg-[#1e1e1e] border border-[#bfa14a] px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-[#bfa14a]`}
                defaultValue=""
              >
                <option value="" className="text-gray-400">
                  Selecione
                </option>
                <option value="Banco do Brasil" className="text-white">
                  Banco do Brasil
                </option>
                <option value="Bradesco" className="text-white">
                  Bradesco
                </option>
                <option value="Caixa" className="text-white">
                  Caixa
                </option>
                <option value="Itaú" className="text-white">
                  Itaú
                </option>
                <option value="Nubank" className="text-white">
                  Nubank
                </option>
              </select>
              {errors.banco && (
                <p className="mt-1 text-sm text-red-500">{errors.banco.message}</p>
              )}
            </div>

            {/* Tipo de Conta */}
            <div>
              <label className="block mb-2 font-medium" htmlFor="tipo_conta">
                Tipo de Conta
              </label>
              <select
                {...register("tipo_conta")}
                id="tipo_conta"
                className={`w-full rounded-md bg-[#1e1e1e] border border-[#bfa14a] px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-[#bfa14a]`}
                defaultValue=""
              >
                <option value="" className="text-gray-400">
                  Selecione
                </option>
                <option value="corrente" className="text-white">
                  Conta Corrente
                </option>
                <option value="poupança" className="text-white">
                  Conta Poupança
                </option>
              </select>
              {errors.tipo_conta && (
                <p className="mt-1 text-sm text-red-500">{errors.tipo_conta.message}</p>
              )}
            </div>
          </div>
        </fieldset>

        <button suppressHydrationWarning
  type="submit"
  className="w-full py-3 mt-6 rounded-lg font-semibold shadow-lg text-black"
  style={{
    background:
      "linear-gradient(90deg, #bfa14a 0%, #f0d667 50%, #bfa14a 100%)",
    boxShadow:
      "0 0 8px 2px rgba(191, 161, 74, 0.5), inset 0 0 6px 1px rgba(255, 223, 90, 0.6)",
    transition: "background 0.3s ease",
  }}
  onMouseEnter={(e) =>
    // O onMouseEnter é um evento em React que é disparado quando o ponteiro do mouse entra na área ocupada por um elemento ou por um de seus elementos filhos.
    // Uso comum: Para efeitos de hover, tooltips, highlights interativos

    (e.currentTarget.style.background =
      "linear-gradient(90deg, #ac9945 0%, #bfa14a 50%, #f0d667 100%)")
  }
  onMouseLeave={(e) =>
    // O onMouseLeave é um evento em React que é disparado quando o ponteiro do mouse sai da área ocupada por um elemento e todos os seus filhos.
    // Uso comum: Para finalizar efeitos de hover, esconder tooltips, resetar estados

    (e.currentTarget.style.background =
      "linear-gradient(90deg, #bfa14a 0%, #cfb958 50%, #bfa14a 100%)")
  }
>
  Enviar Cadastro
</button>

      </form>
    </div>
  );
}
