package com.toymix.ToyMix.validation;

import com.toymix.ToyMix.repository.BrinquedoRepository;
import jakarta.validation.ConstraintValidator;
import jakarta.validation.ConstraintValidatorContext;
import org.springframework.beans.factory.annotation.Autowired;
import com.toymix.ToyMix.repository.BrinquedoRepository;

// Validator para checar se a descrição é única
public class UniqueDescricaoValidator implements ConstraintValidator<UniqueDescricao, String> {

    @Autowired
    private BrinquedoRepository brinquedoRepository; // Repositório para verificar no banco

    @Override
    public boolean isValid(String descricao, ConstraintValidatorContext context) {
        if (descricao == null || descricao.isBlank()) {
            return true; // @NotBlank deve cuidar do obrigatório
        }

        // Verifica se já existe produto com a mesma descrição
        return !brinquedoRepository.existsByDescricaoIgnoreCase(descricao);
    }
}
