package com.toymix.ToyMix.dto;

import lombok.Getter;
import lombok.Setter;

import java.math.BigDecimal;

@Getter
@Setter
public class BrinquedoDTO {

    private String nome;
    private String codigo;
    private String marca;
    private String imagem;
    private BigDecimal valor;
    private String descricao;
}