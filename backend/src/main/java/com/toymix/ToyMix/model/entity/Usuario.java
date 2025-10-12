package com.toymix.ToyMix.model.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name="usuario")
public class Usuario {

    @Id
    @SequenceGenerator(
            name = "usuario_id_seq",
            sequenceName = "usuario_id_seq",
            allocationSize = 1
    )
    @GeneratedValue(
            strategy = GenerationType.SEQUENCE,
            generator = "usuario_id_seq"
    )
    @Column(name = "id_usuario")
    private Integer id_usuario;

    @Column(name = "nome")
    private String nome;

    @Column(name = "user_email", nullable = false, unique = true)
    private String userEmail;

    @Column(name = "user_senha", nullable = false)
    private String userSenha;


}
