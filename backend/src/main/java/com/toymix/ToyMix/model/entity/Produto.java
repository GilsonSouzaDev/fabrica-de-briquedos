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
@Table(name = "produto")
public class Produto {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_produto")
    private int idProduto;

    @Column(name = "codigo_produto")
    private String codigoProduto;

    @Column(name = "nome_produto")
    private String nomeProduto;

    @Column(name = "marca_produto")
    private String marcaProduto;

    @Column(name = "imagem_produto")
    private String imagemProduto;

    @Column(name = "valor_produto")
    private BigDecimal valorProduto;

    @Lob
    @Column(name = "descricao_produto")
    private String descricaoProduto;

    @ManyToOne
    @JoinColumn(name = "id_usuario", nullable = false)
    private Usuario usuario;

    @Column(name = "id_categoria")
    private Integer idCategoria;
}