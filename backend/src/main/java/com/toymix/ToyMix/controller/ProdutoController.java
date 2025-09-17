package com.toymix.ToyMix.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("produtos")
public class ProdutoController {

    @GetMapping("/")
    public String ExibirTodosProdutos() {
        return "Todos os produtos da loja...";
    }
}
