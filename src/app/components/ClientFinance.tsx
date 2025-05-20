"use client";

import { useForm, SubmitHandler } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";


const schema = z.object({
  name: z.string().min(1, { message: "Nome é obrigatório" }),
  cpf: z.string().length(11, { message: "CPF é obrigatório" }),
  rg: z.string().length(9, { message: "RG é obrigatório" }),
  data_nascimento: z
  .string()
  .refine((val) => /^\d{4}-\d{2}-\d{2}$/.test(val), {
    message: "Data deve estar no formato AAAA-MM-DD",
  })
  .refine((val) => {
    const date = new Date(val);
    return date.getFullYear() > 1900 && date.getFullYear() <= new Date().getFullYear();
  }, {
    message: "Data de nascimento inválida",
  }),
  telefone: z.string().min(11, { message: "Telefone é obrigatório" }),
  email: z.string().email({ message: "Email inválido" }),
  endereco: z
  .string()
  .max(50, { message: "Endereço é obrigatório e deve ter até 50 caracteres" })
  .regex(/^[A-Za-zÀ-ú\s]+$/, { message: "Endereço deve conter apenas letras e espaços" }),


  banco: z.string().min(1, { message: "Banco é obrigatório" }),
  agencia: z.string().length(4, { message: "Agência deve ter exatamente 4 dígitos" }),
  conta: z.string().length(5, { message: "Conta não encontrada" }),
  digito_conta: z.string().length(1, { message: "Dígito da conta deve ter exatamente 1 dígito" }),
  tipo_conta: z.enum(["corrente", "poupança"], { message: "Tipo de conta é obrigatório" }),
});

type IFormInput = z.infer<typeof schema>;

export default function ClientFinance() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<IFormInput>({
    resolver: zodResolver(schema),
  });

  const onSubmit: SubmitHandler<IFormInput> = (data) => {
    console.log("Dados enviados: ", data);
    alert("Cadastro realizado com sucesso!");
    reset();
  };

  return (
    <div className="max-w-3xl mx-auto p-8 bg-white shadow-lg rounded-xl mt-2">
      <h2 className="text-3xl font-bold mb-8 text-center text-blue-900">Cadastro Bancário</h2>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">

        {/* DADOS PESSOAIS */}
        <fieldset className="border border-black p-6 rounded-lg">
          <legend className="text-xl font-bold text-gray-700 mb-4">Dados Pessoais</legend>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div>
              <label className="block text-md font-medium mb-1 text-black">Nome</label>
              <input {...register("name")} className="input-style border rounded-md border-black text-black" />
              {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}
            </div>

            <div>
              <label className="block text-md font-medium mb-1 text-black">CPF</label>
              <input {...register("cpf")} className="input-style border rounded-md border-black text-black" maxLength={11} />
              {errors.cpf && <p className="text-red-500 text-sm">{errors.cpf.message}</p>}
            </div>

            <div>
              <label className="block text-md font-medium mb-1 text-black">RG</label>
              <input {...register("rg")} className="input-style border rounded-md border-black text-black" maxLength={9} />
              {errors.rg && <p className="text-red-500 text-sm">{errors.rg.message}</p>}
            </div>

            <div>
              <label className="block text-md font-medium mb-1 text-black">Data de Nascimento</label>
              <input type="date" {...register("data_nascimento")} className="input-style rounded-md border-black text-black" />
              {errors.data_nascimento && <p className="text-red-500 text-sm">{errors.data_nascimento.message}</p>}
            </div>

            <div>
              <label className="block text-md font-medium mb-1 text-black">Telefone</label>
              <input {...register("telefone")} className="input-style border rounded-md border-black text-black" maxLength={11} />
              {errors.telefone && <p className="text-red-500 text-sm">{errors.telefone.message}</p>}
            </div>

            <div>
              <label className="block text-md font-medium mb-1 text-black">Email</label>
              <input type="email" {...register("email")} className="input-style border rounded-md border-black text-black " />
              {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
            </div>

            <div className="md:col-span-2">
              <label className="block text-md font-medium mb-1 text-black">Endereço</label>
              <input {...register("endereco")} className="input-style border rounded-md border-black" />
              {errors.endereco && <p className="text-red-500 text-sm">{errors.endereco.message}</p>}
            </div>
          </div>
        </fieldset>

        {/* DADOS BANCÁRIOS */}
        <fieldset className="border border-black p-6 rounded-lg">
          <legend className="text-xl font-bold text-gray-700 mb-4">Dados Bancários</legend>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

          <div>
              <label className="block text-md font-medium mb-1 text-black">Agência</label>
              <input {...register("agencia")} className="input-style border rounded-md text-black" maxLength={4} />
              {errors.agencia && <p className="text-red-500 text-sm">{errors.agencia.message}</p>}
            </div>



            <div>
              <label className="block text-md font-medium mb-1 text-black">Conta</label>
              <input {...register("conta")} className="input-style border rounded-md text-black" maxLength={5} />
              {errors.conta && <p className="text-red-500 text-sm">{errors.conta.message}</p>}
            </div>

            <div>
              <label className="block text-md font-medium mb-1 text-black">Banco</label>
              <select {...register("banco")} className="input-style border rounded-md text-gray-700">
                <option value="">Selecione</option>
                <option value="Banco do Brasil" className="text-black">Banco do Brasil</option>
                <option value="Bradesco" className="text-black">Bradesco</option>
                <option value="Caixa" className="text-black">Caixa</option>
                <option value="Itaú" className="text-black">Itaú</option>
                <option value="Nubank" className="text-black">Nubank</option>
              </select>
              {errors.banco && <p className="text-red-500 text-sm">{errors.banco.message}</p>}
            </div>

            <div>
              <label className="block text-md font-medium mb-1 text-black">Dígito da Conta</label>
              <input {...register("digito_conta")} className="input-style border rounded-md border-black text-black" maxLength={1} />
              {errors.digito_conta && <p className="text-red-500 text-sm">{errors.digito_conta.message}</p>}
              </div>

            <div>
              <label className="block text-md font-size mb-1 text-black">Tipo de Conta</label>
              <select {...register("tipo_conta")} className="input-style border border-black text-gray-700 rounded-md">
                <option value="">Selecione</option>
                <option value="corrente" className="text-black">Conta Corrente</option>
                <option value="poupança" className="text-black">Conta Poupança</option>
              </select>
              {errors.tipo_conta && <p className="text-red-500 text-sm">{errors.tipo_conta.message}</p>}
            </div>
          </div>
        </fieldset>

        <button
          type="submit"
          className="w-full bg-blue-800 hover:bg-blue-900 transition-all text-white font-semibold py-3 px-6 rounded-lg shadow-md"
        >
          Enviar Cadastro
        </button>
      </form>
    </div>
  );
}
