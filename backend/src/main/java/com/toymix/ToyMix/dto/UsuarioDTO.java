package com.toymix.ToyMix.dto;

import com.toymix.ToyMix.validation.UniqueUserEmail;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class UsuarioDTO {

    @NotBlank(message = "O nome não pode estar vazio.")
    private String nome;

    @NotBlank(message = "O e-mail não pode estar vazio.")
    @Email(message = "Informe um e-mail válido.")
    @UniqueUserEmail(message = "Já existe um usuário com este e-mail.")
    private String userEmail;

    @NotBlank(message = "A senha não pode estar vazia.")
    private String userSenha;
}
