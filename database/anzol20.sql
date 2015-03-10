-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='TRADITIONAL,ALLOW_INVALID_DATES';

-- -----------------------------------------------------
-- Schema anzol20
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema anzol20
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `anzol20` DEFAULT CHARACTER SET utf8 COLLATE utf8_general_ci ;
USE `anzol20` ;

-- -----------------------------------------------------
-- Table `anzol20`.`sexo`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `anzol20`.`sexo` ;

CREATE TABLE IF NOT EXISTS `anzol20`.`sexo` (
  `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `nome` VARCHAR(512) NULL,
  `__status__` TINYINT(1) NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8
COLLATE = utf8_unicode_ci;


-- -----------------------------------------------------
-- Table `anzol20`.`inscricao`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `anzol20`.`inscricao` ;

CREATE TABLE IF NOT EXISTS `anzol20`.`inscricao` (
  `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `nome_completo` VARCHAR(256) NULL,
  `data_de_nascimento` DATE NULL,
  `sexo` INT UNSIGNED NOT NULL,
  `email` VARCHAR(256) NULL,
  `estrangeiro` TINYINT(1) NULL,
  `cpf` VARCHAR(11) NULL,
  `nome_do_documento` VARCHAR(128) NULL,
  `numero_do_documento` VARCHAR(64) NULL,
  `telefones` VARCHAR(128) NULL,
  `logradouro` VARCHAR(256) NULL,
  `numero` VARCHAR(8) NULL,
  `complemento` VARCHAR(128) NULL,
  `bairro` VARCHAR(128) NULL,
  `localidade` VARCHAR(128) NULL,
  `uf` VARCHAR(2) NULL,
  `cep` VARCHAR(8) NULL,
  `endereco` VARCHAR(512) NULL,
  `nome_no_cracha` VARCHAR(256) NULL,
  `categoria` INT UNSIGNED NULL,
  `curso_ou_formacao` VARCHAR(256) NULL,
  `acronimo_da_instituicao_ou_empresa` VARCHAR(64) NULL,
  `nome_da_instituicao_ou_empresa` VARCHAR(256) NULL,
  `curso_matutino` VARCHAR(32) NULL,
  `curso_vespertino` VARCHAR(32) NULL,
  `__status__` TINYINT(1) NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_inscricao_sexo_idx` (`sexo` ASC),
  CONSTRAINT `fk_inscricao_sexo`
    FOREIGN KEY (`sexo`)
    REFERENCES `anzol20`.`sexo` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8
COLLATE = utf8_unicode_ci;


-- -----------------------------------------------------
-- Table `anzol20`.`usuario`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `anzol20`.`usuario` ;

CREATE TABLE IF NOT EXISTS `anzol20`.`usuario` (
  `email` VARCHAR(255) NOT NULL,
  `inscricao` INT UNSIGNED NULL,
  `__status__` TINYINT(1) NULL,
  PRIMARY KEY (`email`),
  INDEX `fk_usuario_inscricao1_idx` (`inscricao` ASC),
  CONSTRAINT `fk_usuario_inscricao`
    FOREIGN KEY (`inscricao`)
    REFERENCES `anzol20`.`inscricao` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8
COLLATE = utf8_unicode_ci;


-- -----------------------------------------------------
-- Table `anzol20`.`pagamento`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `anzol20`.`pagamento` ;

CREATE TABLE IF NOT EXISTS `anzol20`.`pagamento` (
  `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `inscricao` INT UNSIGNED NOT NULL,
  `valor` DECIMAL(10,2) NULL,
  `status` TINYINT(1) NULL,
  `__status__` TINYINT(1) NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_pagamento_inscricao1_idx` (`inscricao` ASC),
  CONSTRAINT `fk_pagamento_inscricao`
    FOREIGN KEY (`inscricao`)
    REFERENCES `anzol20`.`inscricao` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8
COLLATE = utf8_unicode_ci;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;

-- -----------------------------------------------------
-- Data for table `anzol20`.`sexo`
-- -----------------------------------------------------
START TRANSACTION;
USE `anzol20`;
INSERT INTO `anzol20`.`sexo` (`id`, `nome`, `__status__`) VALUES (1, 'Feminino', 1);
INSERT INTO `anzol20`.`sexo` (`id`, `nome`, `__status__`) VALUES (2, 'Masculino', 1);

COMMIT;
