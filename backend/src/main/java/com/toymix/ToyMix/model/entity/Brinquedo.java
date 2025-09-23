package com.toymix.ToyMix.model.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.math.BigDecimal;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "brinquedo")
public class Brinquedo {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private int id;

    @Column(name = "codigo", nullable = false)
    private String codigo;

    @Column(name = "nome", nullable = false)
    private String nome;

    @Column(name = "marca", nullable = false)
    private String marca;

    @Column(name = "imagem", nullable = false)
    private String imagem;

    @Column(name = "valor", nullable = false)
    private BigDecimal valor;

    @Lob
    @Column(name = "detalhes")
    private String detalhes;

    @Column(name = "quantVendas")
    private Integer quantVendas;

}