import { object, string } from 'yup';

class DataSchema {
  constructor() {
    this.register = object({
      name: string()
        .required('Campo nome é obrigatório')
        .min(4, 'O nome precisa ter no mínimo 4 caracteres!'),
      email: string()
        .required('Campo email é obrigatório')
        .email('Email inválido'),
      password: string()
        .required('Campo senha é obrigatório')
        .min(6, 'A senha precisa ter no mínimo 6 caracteres'),
    });

    this.login = object({
      email: string()
        .required('Campo email é obrigatório')
        .email('Email inválido'),
      password: string()
        .required('Campo senha é obrigatório')
        .min(6, 'A senha precisa ter no mínimo 6 caracteres!'),
    });

    this.update = object({
      name: string().min(4, 'O nome precisa ter no mínimo 4 caracteres!'),
      email: string().email('Email inválido'),
      password: string().min(6, 'A senha precisa ter no mínimo 6 caracteres'),
    }).test(
      'at-least-one-field',
      'Informe ao menos um campo para atualização',
      (value) => Object.keys(value || {}).length > 0,
    );
  }
}

export default new DataSchema();
