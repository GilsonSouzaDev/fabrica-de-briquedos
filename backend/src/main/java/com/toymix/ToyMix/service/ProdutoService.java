package com.toymix.ToyMix.service;

import com.toymix.ToyMix.dto.ProdutoDTO;
import com.toymix.ToyMix.model.entity.Produto;
import com.toymix.ToyMix.model.entity.Usuario;
import com.toymix.ToyMix.repository.ProdutoRepository;
import com.toymix.ToyMix.repository.UsuarioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Optional;

@Service
public class ProdutoService {

    @Autowired
    private ProdutoRepository produtoRepository;

    @Autowired
    private UsuarioRepository usuarioRepository;

    public List<Produto> listarTodosProdutos() {
        return produtoRepository.findAll();
    }

    public Produto cadastrarProduto(ProdutoDTO produtoDTO) {
        Produto produto = new Produto();
        produto.setCodigoProduto(produtoDTO.getCodigoProduto());
        produto.setNomeProduto(produtoDTO.getNomeProduto());
        produto.setMarcaProduto(produtoDTO.getMarcaProduto());
        produto.setImagemProduto(produtoDTO.getImagemProduto());
        produto.setValorProduto(produtoDTO.getValorProduto());
        produto.setDescricaoProduto(produtoDTO.getDescricaoProduto());

        Usuario usuario = usuarioRepository.findById(produtoDTO.getIdUsuario())
                .orElseThrow(() -> new RuntimeException("Usuário não encontrado"));

        produto.setUsuario(usuario);
        produto.setIdCategoria(produtoDTO.getIdCategoria());

        return produtoRepository.save(produto);
    }

    public Optional<Produto> atualizarProduto(int idProduto, ProdutoDTO produtoDTO) {
        return produtoRepository.findById(idProduto).map(produto -> {
            produto.setCodigoProduto(produtoDTO.getCodigoProduto());
            produto.setNomeProduto(produtoDTO.getNomeProduto());
            produto.setMarcaProduto(produtoDTO.getMarcaProduto());
            produto.setImagemProduto(produtoDTO.getImagemProduto());
            produto.setValorProduto(produtoDTO.getValorProduto());
            produto.setDescricaoProduto(produtoDTO.getDescricaoProduto());

            Usuario usuario = usuarioRepository.findById(produtoDTO.getIdUsuario())
                    .orElseThrow(() -> new RuntimeException("Usuário não encontrado"));

            produto.setUsuario(usuario);
            produto.setIdCategoria(produtoDTO.getIdCategoria());

            return produtoRepository.save(produto);
        });
    }

    public void excluirProduto(int idProduto) {
        produtoRepository.deleteById(idProduto);
    }
}

