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
@Entity
@Table(name = "brinquedo")
public class Brinquedo {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Integer id;

    @Column(name = "categoria", nullable = false)
    private String categoria;

    @Column(name = "codigo", nullable = false)
    private Integer codigo;

    @Column(name = "descricao", nullable = false)
    private String descricao;

    @Lob
    @Column(name = "detalhes" ,nullable = false, columnDefinition = "TEXT")
    private String detalhes;

    @Column(name = "imagem", nullable = false)
    private String imagem;

    @Column(name = "marca", nullable = false)
    private String marca;

    @Column(name = "quantVendas")
    private Integer quantVendas;

    @Column(name = "valor", nullable = false)
    private BigDecimal valor;



    // Construtores
    public Brinquedo() {}

    public Brinquedo(String categoria, Integer codigo, String descricao,
                     String detalhes, String imagem, String marca,
                     Integer quantVendas, BigDecimal valor) {
        this.categoria = categoria;
        this.codigo = codigo;
        this.descricao = descricao;
        this.detalhes = detalhes;
        this.imagem = imagem;
        this.marca = marca;
        this.quantVendas = quantVendas;
        this.valor = valor;
    }

}

