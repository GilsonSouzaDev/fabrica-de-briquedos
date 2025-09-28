package com.toymix.ToyMix.dto;

import jakarta.persistence.Column;
import jakarta.persistence.Lob;
import lombok.Getter;
import lombok.Setter;

import java.math.BigDecimal;

@Getter
@Setter
public class BrinquedoDTO {

    private int codigo;
    private String descricao;
    private String categoria;
    private String marca;
    private String imagem;
    private BigDecimal valor;
    private String detalhes;
    private Integer quantVendas;

}