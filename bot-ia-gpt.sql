-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema mydb
-- -----------------------------------------------------
-- -----------------------------------------------------
-- Schema bot-ia-gpt
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema bot-ia-gpt
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `bot-ia-gpt` ;
USE `bot-ia-gpt` ;

-- -----------------------------------------------------
-- Table `bot-ia-gpt`.`discord_user`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `bot-ia-gpt`.`discord_user` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `discord_id` VARCHAR(30) NULL DEFAULT NULL,
  `discord_name` VARCHAR(255) NULL DEFAULT NULL,
  `register_date` DATETIME NOT NULL,
  `update_date` DATETIME NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `discord_id_UNIQUE` (`discord_id` ASC) VISIBLE)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb3;


-- -----------------------------------------------------
-- Table `bot-ia-gpt`.`discord_server`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `bot-ia-gpt`.`discord_server` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `discord_id` VARCHAR(255) NULL DEFAULT NULL,
  `name` VARCHAR(255) NOT NULL,
  `register_date` DATETIME NOT NULL,
  `update_date` DATETIME NULL DEFAULT NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb3;


-- -----------------------------------------------------
-- Table `bot-ia-gpt`.`discord_channel`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `bot-ia-gpt`.`discord_channel` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `channel_id` VARCHAR(30) NOT NULL,
  `channel_name` VARCHAR(255) NOT NULL,
  `register_date` DATETIME NOT NULL,
  `update_date` DATETIME NULL DEFAULT NULL,
  `user_id` INT NOT NULL,
  `server_id` INT NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_discord_user_channel_1_idx` (`user_id` ASC) VISIBLE,
  INDEX `fk_discord_user_channel_2_idx` (`server_id` ASC) VISIBLE,
  CONSTRAINT `fk_discord_user_channel_1`
    FOREIGN KEY (`user_id`)
    REFERENCES `bot-ia-gpt`.`discord_user` (`id`)
    ON DELETE RESTRICT
    ON UPDATE RESTRICT,
  CONSTRAINT `fk_discord_user_channel_2`
    FOREIGN KEY (`server_id`)
    REFERENCES `bot-ia-gpt`.`discord_server` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb3;


-- -----------------------------------------------------
-- Table `bot-ia-gpt`.`ai_system_config_discord_channel`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `bot-ia-gpt`.`ai_system_config_discord_channel` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `system_description` LONGTEXT NOT NULL,
  `temperature` FLOAT NOT NULL,
  `register_date` DATETIME NOT NULL,
  `update_date` DATETIME NULL DEFAULT NULL,
  `channel_id` INT NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_tw3_agendador_agenda_tw3_agendador_usuario_canal1_idx` (`channel_id` ASC) VISIBLE,
  CONSTRAINT `fk_tw3_agendador_agenda_tw3_agendador_usuario_canal1`
    FOREIGN KEY (`channel_id`)
    REFERENCES `bot-ia-gpt`.`discord_channel` (`id`)
    ON DELETE RESTRICT
    ON UPDATE RESTRICT)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb3;


-- -----------------------------------------------------
-- Table `bot-ia-gpt`.`travel_stage`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `bot-ia-gpt`.`travel_stage` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(255) NOT NULL,
  `register_date` DATETIME NOT NULL,
  `update_date` DATETIME NULL DEFAULT NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb3;


-- -----------------------------------------------------
-- Table `bot-ia-gpt`.`travel_user`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `bot-ia-gpt`.`travel_user` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `from` CHAR(3) NULL DEFAULT NULL,
  `to` CHAR(3) NULL DEFAULT NULL,
  `departure_date` DATE NOT NULL,
  `back_date` DATE NULL DEFAULT NULL,
  `number_pax` INT NOT NULL,
  `travel_filter` VARCHAR(45) NULL DEFAULT NULL,
  `register_date` DATETIME NOT NULL,
  `update_date` DATETIME NULL DEFAULT NULL,
  `status` VARCHAR(45) NULL DEFAULT NULL,
  `stage_id` INT NOT NULL,
  `channel_id` INT NOT NULL,
  `user_id` INT NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_tw3_agendador_etapa_usuario_tw3_agendador_etapa_idx` (`stage_id` ASC) VISIBLE,
  INDEX `fk_tw3_agendador_etapa_usuario_tw3_agendador_usuario_canal1_idx` (`channel_id` ASC) VISIBLE,
  INDEX `fk_tw3_agendador_etapa_usuario_tw3_agendador_usuario1_idx` (`user_id` ASC) VISIBLE,
  CONSTRAINT `fk_travel_user_1`
    FOREIGN KEY (`user_id`)
    REFERENCES `bot-ia-gpt`.`discord_user` (`id`),
  CONSTRAINT `fk_travel_user_2`
    FOREIGN KEY (`channel_id`)
    REFERENCES `bot-ia-gpt`.`discord_channel` (`id`),
  CONSTRAINT `fk_travel_user_3`
    FOREIGN KEY (`stage_id`)
    REFERENCES `bot-ia-gpt`.`travel_stage` (`id`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb3;


-- -----------------------------------------------------
-- Table `bot-ia-gpt`.``
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `bot-ia-gpt`.`` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `iata` CHAR(3) NOT NULL,
  `nome` VARCHAR(255) NOT NULL,
  `data_cadastro` DATETIME NOT NULL,
  `data_atualizacao` DATETIME NULL DEFAULT NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb3;


-- -----------------------------------------------------
-- Table `bot-ia-gpt`.`tw3_instagram_credentials`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `bot-ia-gpt`.`tw3_instagram_credentials` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `access_token` VARCHAR(256) NOT NULL,
  `expires_in` INT NOT NULL,
  `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb3;


-- -----------------------------------------------------
-- Table `bot-ia-gpt`.`tw3_instagram_posts`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `bot-ia-gpt`.`tw3_instagram_posts` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `instagram_post_id` VARCHAR(256) NOT NULL,
  `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb3;


-- -----------------------------------------------------
-- Table `bot-ia-gpt`.`tw3_instagram_profiles`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `bot-ia-gpt`.`tw3_instagram_profiles` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `instagram_profile_name` VARCHAR(256) NOT NULL,
  `discord_profile_id` VARCHAR(50) NOT NULL,
  `message_custom` VARCHAR(256) NULL DEFAULT NULL,
  `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `instagram_profile_name_UNIQUE` (`instagram_profile_name` ASC) VISIBLE)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb3;


-- -----------------------------------------------------
-- Table `bot-ia-gpt`.`discord_user_channel`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `bot-ia-gpt`.`discord_user_channel` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `register_date` DATETIME NOT NULL,
  `user_id` INT NOT NULL,
  `channel_id` INT NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_discord_user_channel_1_idx` (`user_id` ASC) VISIBLE,
  INDEX `fk_discord_user_channel_20_idx` (`channel_id` ASC) VISIBLE,
  CONSTRAINT `fk_discord_user_channel_10`
    FOREIGN KEY (`user_id`)
    REFERENCES `bot-ia-gpt`.`discord_user` (`id`)
    ON DELETE RESTRICT
    ON UPDATE RESTRICT,
  CONSTRAINT `fk_discord_user_channel_20`
    FOREIGN KEY (`channel_id`)
    REFERENCES `bot-ia-gpt`.`discord_channel` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb3;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
