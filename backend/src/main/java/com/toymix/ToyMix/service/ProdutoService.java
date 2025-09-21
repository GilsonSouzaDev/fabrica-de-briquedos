package com.toymix.ToyMix.service;

import com.toymix.ToyMix.dto.ProdutoDTO;
import com.toymix.ToyMix.model.entity.Produto;
import com.toymix.ToyMix.model.entity.Usuario;
import com.toymix.ToyMix.repository.ProdutoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Optional;

@Service
public class ProdutoService {

    @Autowired
    private ProdutoRepository produtoRepository;

    public List<Produto> listarTodosProdutos() {
        return produtoRepository.findAll();
    }
}

