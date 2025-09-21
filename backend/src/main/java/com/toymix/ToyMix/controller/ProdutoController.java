package com.toymix.ToyMix.controller;

import com.toymix.ToyMix.dto.ProdutoDTO;
import com.toymix.ToyMix.model.entity.Produto;
import com.toymix.ToyMix.service.ProdutoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/produtos")
public class ProdutoController {

    @Autowired
    private ProdutoService produtoService;

    @GetMapping("/")
    public List<Produto> ExibirTodosProdutos() {
        return produtoService.listarTodosProdutos();
    }
}
