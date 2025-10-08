package com.toymix.ToyMix.dto;

import com.toymix.ToyMix.validation.UniqueCodigo;
import com.toymix.ToyMix.validation.UniqueDescricao;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.Getter;
import lombok.Setter;

import java.math.BigDecimal;


@Getter
@Setter
@UniqueCodigo
@UniqueDescricao
public class BrinquedoDTO {

    private Integer id;

    @NotNull(message = "O código não pode estar vazio.")
    private int codigo;

    @Size(min = 5, max = 35, message = "A descricão deve ter entre {min} e {max} caracteres")
    @NotBlank(message = "O campo descrição não pode estar vazio.")
    private String descricao;


    @NotBlank(message = "A categoria não pode estar vazia.")
    private String categoria;

    @Size(min = 3, max = 35, message = "A marca deve ter entre {min} e {max} caracteres")
    @NotBlank(message = "A marca não pode estar vazia.")
    private String marca;

    @NotBlank(message = "O campo imagem não pode estar vazio.")
    private String imagem;

    @NotNull(message = "O valor não pode estar vazio.")
    private BigDecimal valor;

    @Size(min = 5, max = 250, message = "A marca deve ter entre {min} e {max} caracteres")
    @NotBlank(message = "O campo detalhe não podem estar vazios.")
    private String detalhes;

    private Integer quantVendas;
}
