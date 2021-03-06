USE [database]
GO
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
ALTER procedure [dbo].[usp_dpt_upinsert](@codigo_departamento_dpt INT, @nome_resp_dpt VARCHAR(155), @usuario_dpt VARCHAR(40), @email_user_dpt VARCHAR(155))
AS
IF EXISTS (SELECT * FROM departamento WHERE codigo_departamento_dpt = @codigo_departamento_dpt)
UPDATE departamento
SET nome_resp_dpt = @nome_resp_dpt, usuario_dpt = @usuario_dpt, email_user_dpt = @email_user_dpt
WHERE codigo_departamento_dpt = @codigo_departamento_dpt

ELSE

INSERT INTO departamento
(codigo_departamento_dpt, nome_resp_dpt, usuario_dpt, email_user_dpt) 
VALUES 
(@codigo_departamento_dpt, @nome_resp_dpt, @usuario_dpt, @email_user_dpt);

