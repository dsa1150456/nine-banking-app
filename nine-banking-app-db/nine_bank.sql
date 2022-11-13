-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema nine_bank
-- -----------------------------------------------------
-- -----------------------------------------------------
-- Schema nine_bank
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `nine_bank` DEFAULT CHARACTER SET utf8 ;
USE `nine_bank` ;

DROP TABLE IF EXISTS `nine_bank`.`users`;
-- -----------------------------------------------------
-- Table `nine_bank`.`user`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `nine_bank`.`users` (
  `userid` INT NOT NULL AUTO_INCREMENT,
  `username` VARCHAR(20) NOT NULL,
  `password` VARCHAR(100) NOT NULL,
  PRIMARY KEY (`userid`),
  UNIQUE INDEX `username_UNIQUE` (`username` ASC) VISIBLE)
ENGINE = InnoDB;


DROP TABLE IF EXISTS `nine_bank`.`accounts`;
-- -----------------------------------------------------
-- Table `nine_bank`.`account`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `nine_bank`.`accounts` (
  `accountid` INT NOT NULL AUTO_INCREMENT,
  `balance` DECIMAL(10,2) NOT NULL DEFAULT 0,
  `user_userid` INT NOT NULL,
  PRIMARY KEY (`accountid`),
  INDEX `fk_account_user_idx` (`user_userid` ASC) VISIBLE,
  CONSTRAINT `fk_account_users`
    FOREIGN KEY (`user_userid`)
    REFERENCES `nine_bank`.`users` (`userid`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


DROP TABLE IF EXISTS `nine_bank`.`transactions`;
-- -----------------------------------------------------
-- Table `nine_bank`.`transaction`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `nine_bank`.`transactions` (
  `transactionid` INT NOT NULL AUTO_INCREMENT,
  `from_account_id` INT NOT NULL,
  `to_account_id` INT,
  `note` VARCHAR(50) NULL,
  `transaction_time` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `transaction_type` VARCHAR(45) NOT NULL,
  `transaction_amount` DECIMAL(10,2) NOT NULL,
  PRIMARY KEY (`transactionid`),
  INDEX `fk_transaction_account1_idx` (`from_account_id` ASC) VISIBLE,
  INDEX `fk_transaction_account2_idx` (`to_account_id` ASC) VISIBLE,
  CONSTRAINT `fk_transaction_account1`
    FOREIGN KEY (`from_account_id`)
    REFERENCES `nine_bank`.`accounts` (`accountid`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_transaction_account2`
    FOREIGN KEY (`to_account_id`)
    REFERENCES `nine_bank`.`accounts` (`accountid`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;

