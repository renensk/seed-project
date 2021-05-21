var express = require('express');
var router = express.Router();

var Message = require('../models/message');

router.patch('/:id',function(req,res,next){
    Message.findById(req.params.id, function(err,resultMsgRecuperada){
        if(err){
            return res.status(500).json({
                myErroTitle: 'Um erro aconteceu na hora de buscar a msg pelo ID',
                myError: err
            });
        }
        if(!resultMsgRecuperada){
            return res.status(500).json({
                myErroTitle: 'Não encontrou a mensagem',
                myError: {info: "Não encontrou a mensagem com o ID: "+req.params.id}
            });
        }
        resultMsgRecuperada.content = req.body.content;
        resultMsgRecuperada.save(function(err, resultMsgAlterada){
            if(err){
                return res.status(500).json({
                    myErroTitle: 'Um erro aconteceu na hora de atualizar a mensagem',
                    myError: err
                });
            }
            res.status(200).json({
                myMsgSucess: "Mensagem atualizada com sucesso",
                objMessageAtualizado: resultMsgAlterada
            });
        });
    });
});

router.get('/',function(req,res,next){
    Message.find()
    .exec(function(err,result){
        if(err){
            return res.status(500).json({
                myErroTitle: 'Um erro aconteceu na hora de buscar a mensagem',
                myError: err
            })
        }
        res.status(200).json({
            myMsgSucess: "Mensagem recuperada com sucesso",
            objSMessageSRecuperadoS: result
        })
    });
});

router.post('/',function (req,res,next){
        var message = new Message({
            content: req.body.content
        });
    message.save(function(err, result){
        if(err){
            return res.status(500).json({
                myErroTitle: 'Um erro aconteceu na hora de salvar',
                myError: err
            });
        }
        res.status(201).json({
            myMsgSucess: "Mensagem salva com sucesso",
            objMessageSave: result
        });
    });


});

router.delete('/id',function(req,res,next){
    Message.findById(req.params.id, function(err, resultMsgRecuperada){
        if(err){
            return res.status(500).json({
                myErroTitle: 'Um erro aconteceu na hora de buscar a mensagem pelo ID para deletar',
                myError: err
            });
        }
        if(!resultMsgRecuperada){
            return res.status(500).json({
                myErroTitle: 'Não encontrou a mensagem para deletar',
                myError: {info: "Não encontrou a mensagem para deletar com o ID: "+req.params.id}
            });
        }
        resultMsgRecuperada.remove(function(err, resultMsgDeletada){
            if(err){
                return res.status(500).json({
                    myErroTitle: 'Um erro aconteceu na hora de deletar a mensagem',
                    myError: err
                });
            }
            res.status(200).json({
                myMsgSucess: "Mensagem deletada com sucesso",
                objMessageApagada: resultMsgDeletada
            });
        })
    });
});

module.exports = router;