"use client";

import { useForm, SubmitHandler } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const schema = z.object({
  name: z.string().min(1, { message: "Nome é obrigatório" }),
  cpf: z.string().length(11, { message: "CPF deve ter exatamente 11 caracteres" }),
  rg: z.string().length(9, { message: "RG deve ter exatamente 9 caracteres" }),
  data_nascimento: z
    .string()
    .refine((val) => /^\d{4}-\d{2}-\d{2}$/.test(val), {
      message: "Data deve estar no formato AAAA-MM-DD",
    })
    .refine((val) => {
      const date = new Date(val);
      return !isNaN(date.getTime());
    }, {
      message: "Data de nascimento inválida",
    }),
  telefone: z.string().min(13, { message: "Telefone é obrigatório" }),
  email: z.string().email({ message: "Email inválido" }),
  endereco: z.string().max(50, { message: "Endereço é obrigatório" }),

  banco: z.string().min(1, { message: "Banco é obrigatório" }),
  agencia: z.string().length(4, { message: "Agência deve ter exatamente 4 dígitos" }),
  conta: z.string().length(8, { message: "Conta deve ter exatamente 8 dígitos" }),
  tipo_conta: z.enum(["corrente", "poupança"], { message: "Tipo de conta é obrigatório" }),
});

type IFormInput = z.infer<typeof schema>;

export default function ClientFinance() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormInput>({
    resolver: zodResolver(schema),
  });

  const onSubmit: SubmitHandler<IFormInput> = (data) => {
    console.log("Dados enviados: ", data);
    alert("Cadastro realizado com sucesso!");
  };

  return (
    <div className="max-w-3xl mx-auto p-8 bg-white shadow-lg rounded-xl mt-12">
      <h2 className="text-3xl font-bold mb-8 text-center text-blue-700">Cadastro Bancário</h2>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">

        {/* DADOS PESSOAIS */}
        <fieldset className="border border-gray-200 p-6 rounded-lg">
          <legend className="text-xl font-semibold text-gray-700 mb-4">Dados Pessoais</legend>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div>
              <label className="block text-sm font-medium mb-1">Nome</label>
              <input {...register("name")} className="input-style" />
              {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">CPF</label>
              <input {...register("cpf")} className="input-style" maxLength={11} />
              {errors.cpf && <p className="text-red-500 text-sm">{errors.cpf.message}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">RG</label>
              <input {...register("rg")} className="input-style" maxLength={9} />
              {errors.rg && <p className="text-red-500 text-sm">{errors.rg.message}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Data de Nascimento</label>
              <input type="date" {...register("data_nascimento")} className="input-style" />
              {errors.data_nascimento && <p className="text-red-500 text-sm">{errors.data_nascimento.message}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Telefone</label>
              <input {...register("telefone")} className="input-style" />
              {errors.telefone && <p className="text-red-500 text-sm">{errors.telefone.message}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Email</label>
              <input type="email" {...register("email")} className="input-style" />
              {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-medium mb-1">Endereço</label>
              <input {...register("endereco")} className="input-style" />
              {errors.endereco && <p className="text-red-500 text-sm">{errors.endereco.message}</p>}
            </div>
          </div>
        </fieldset>

        {/* DADOS BANCÁRIOS */}
        <fieldset className="border border-gray-200 p-6 rounded-lg">
          <legend className="text-xl font-semibold text-gray-700 mb-4">Dados Bancários</legend>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div>
              <label className="block text-sm font-medium mb-1">Banco</label>
              <select {...register("banco")} className="input-style">
                <option value="">Selecione</option>
                <option value="Banco do Brasil">Banco do Brasil</option>
                <option value="Bradesco">Bradesco</option>
                <option value="Caixa">Caixa</option>
                <option value="Itaú">Itaú</option>
                <option value="Nubank">Nubank</option>
              </select>
              {errors.banco && <p className="text-red-500 text-sm">{errors.banco.message}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Agência</label>
              <input {...register("agencia")} className="input-style" maxLength={4} />
              {errors.agencia && <p className="text-red-500 text-sm">{errors.agencia.message}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Conta</label>
              <input {...register("conta")} className="input-style" maxLength={8} />
              {errors.conta && <p className="text-red-500 text-sm">{errors.conta.message}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Tipo de Conta</label>
              <select {...register("tipo_conta")} className="input-style">
                <option value="">Selecione</option>
                <option value="corrente">Conta Corrente</option>
                <option value="poupança">Conta Poupança</option>
              </select>
              {errors.tipo_conta && <p className="text-red-500 text-sm">{errors.tipo_conta.message}</p>}
            </div>
          </div>
        </fieldset>

        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 transition-all text-white font-semibold py-3 px-6 rounded-lg shadow-md"
        >
          Enviar Cadastro
        </button>
      </form>
    </div>
  );
}
