package com.toymix.ToyMix.dto;

import com.toymix.ToyMix.validation.UniqueUserEmail;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class UsuarioDTO {

    @Size(min = 3, message = "A senha deve conter no minimo 3 caracteres")
    @NotBlank(message = "O nome não pode estar vazio.")
    private String nome;

    @NotBlank(message = "O e-mail não pode estar vazio.")
    @Email(message = "Informe um e-mail válido.")
    @UniqueUserEmail(message = "Já existe um usuário com este e-mail.")
    private String userEmail;

    @Size(min = 6, message = "A senha deve conter no minimo 6 caracteres")
    @NotBlank(message = "A senha não pode estar vazia.")
    private String userSenha;
}
