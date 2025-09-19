package com.toymix.ToyMix.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Getter;
import lombok.Setter;

import java.math.BigDecimal;

@Getter
@Setter
public class ProdutoDTO {

    private String codigoProduto;
    private String nomeProduto;
    private String marcaProduto;
    private String imagemProduto;
    private BigDecimal valorProduto;
    private String descricaoProduto;
    private Integer idUsuario;
    private Integer idCategoria;
}