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

    @Column(name = "categoria", nullable = false)
    private String categoria;

    @Column(name = "codigo", nullable = false, unique = true) // Adicionado unique = true
    private Integer codigo;

    @Column(name = "descricao", nullable = false)
    private String descricao;

    @Column(name = "detalhes", nullable = false, columnDefinition = "TEXT")
    private String detalhes;

    @Column(name = "imagem", nullable = false)
    private String imagem;

    @Column(name = "marca", nullable = false)
    private String marca;

    @Column(name = "quant_vendas")
    private Integer quantVendas;

    @Column(name = "valor", nullable = false)
    private BigDecimal valor;

}
