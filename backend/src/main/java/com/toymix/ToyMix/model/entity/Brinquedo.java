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
    private Integer id;

    @Column(name = "codigo", nullable = false)
    private int codigo;

    @Column(name = "descricao", nullable = false)
    private String descricao;

    @Column(name = "categoria", nullable = false)
    private String categoria;

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