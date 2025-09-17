package com.toymix.ToyMix.repository;

import com.toymix.ToyMix.model.entity.Produto;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ProdutoRepository extends JpaRepository<Produto, Integer> {
}
