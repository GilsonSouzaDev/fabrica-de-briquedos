package com.toymix.ToyMix.repository;

import com.toymix.ToyMix.model.entity.Brinquedo;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface BrinquedoRepository extends JpaRepository<Brinquedo, Integer> {

    Optional<Brinquedo> findByDescricaoIgnoreCase(String descricao);

    List<Brinquedo> findByDescricaoContainsIgnoreCase(String descricao);

    boolean existsByDescricaoIgnoreCase(String descricao);

    boolean existsByCodigo(Integer codigo);


}
