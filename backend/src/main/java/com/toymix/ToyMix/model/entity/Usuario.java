package com.toymix.ToyMix.model.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@Entity
@Table(name="usuario")
public class Usuario {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id_usuario;
    private String nome;

    @Column(name = "userEmail", nullable = false)
    private String userEmail;

    @Column(name = "userSenha", nullable = false)
    private String userSenha;

    public Usuario(){}

    public Usuario(String nome, String userEmail, String userSenha){
        this.nome = nome;
        this.userEmail = userEmail;
        this.userSenha = userSenha;
    }

}
