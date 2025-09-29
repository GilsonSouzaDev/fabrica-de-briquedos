package com.toymix.ToyMix.validation;

import jakarta.validation.ConstraintValidator;
import jakarta.validation.ConstraintValidatorContext;
import org.springframework.beans.factory.annotation.Autowired;
import com.toymix.ToyMix.repository.BrinquedoRepository;

public class UniqueCodigoValidator implements ConstraintValidator<UniqueCodigo, Integer> {

    @Autowired
    private BrinquedoRepository brinquedoRepository;

    @Override
    public boolean isValid(Integer codigo, ConstraintValidatorContext context) {
        if (codigo == null) {
            return true; // @NotBlank cuida do obrigatório
        }
        return !brinquedoRepository.existsByCodigo(codigo);
    }
}
