package com.toymix.ToyMix.dto;

import com.toymix.ToyMix.validation.UniqueCodigo;
import com.toymix.ToyMix.validation.UniqueDescricao;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;

import java.math.BigDecimal;

@Getter
@Setter
public class BrinquedoDTO {

    @NotNull(message = "O código não pode estar vazio.")
    @UniqueCodigo(message = "Já existe um brinquedo com este codigo.")
    private int codigo;

    @NotBlank(message = "O campo descrição não pode estar vazio.")
    @UniqueDescricao(message = "Já existe um brinquedo com essa descrição.")
    private String descricao;

    @NotBlank(message = "A categoria não pode estar vazia.")
    private String categoria;

    @NotBlank(message = "A marca não pode estar vazia.")
    private String marca;

    @NotBlank(message = "O campo imagem não pode estar vazio.")
    private String imagem;

    @NotNull(message = "O valor não pode estar vazio.")
    private BigDecimal valor;

    @NotBlank(message = "O campo detalhe não podem estar vazios.")
    private String detalhes;

    private Integer quantVendas;
}
