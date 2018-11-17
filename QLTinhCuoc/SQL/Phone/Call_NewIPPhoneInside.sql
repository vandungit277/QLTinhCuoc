USE PowerCall
GO
/*
Author: Dungdv24
Desc: 07/11/2018
Desc: Thêm mới số nội bộ
*/
ALTER PROCEDURE Call_NewIPPhoneInside
@UserName VARCHAR(50) ,
@ServiceProviderID INT,
@IPPhone VARCHAR(50),
@Status INT,
@Description NVARCHAR(500),
@CreateBy VARCHAR(50)
AS
BEGIN
	DECLARE @StaffID INT,@Code INT,@Desc NVARCHAR(500);
	SELECT @StaffID = StaffID FROM dbo.Staff(NOLOCK) WHERE UserName = @UserName
	IF ISNULL(@StaffID,0) =0
	BEGIN
		
		SET @Code = -1;
		SET @Desc =N'Tài khoản cấp IPphone không tồn tại';
		GOTO result;
	END
	IF NOT EXISTS(SELECT 1 FROM dbo.Staff(NOLOCK) WHERE UserName = @CreateBy)
	BEGIN
		
		SET @Code = -2;
		SET @Desc =N'Hết Secsion vui lòng đăng nhập lại';
		GOTO result;
	END
	IF EXISTS(SELECT 1 FROM dbo.IPPhoneInside(NOLOCK) WHERE IPPhone = @IPPhone AND Status =1)
	BEGIN
		
		SET @Code = -3;
		SET @Desc =N'IPPhone này đang được sử dụng cho nhân viên khác';
		GOTO result;
	END
	IF EXISTS(SELECT 1 FROM dbo.IPPhoneInside(NOLOCK) WHERE StaffID = @StaffID AND Status =1)
	BEGIN
		
		SET @Code = -4;
		SET @Desc =N'Nhân viên này đã được cấp IPPhone';
		GOTO result;
	END

	INSERT INTO dbo.IPPhoneInside
	        ( StaffID ,
	          ServiceProviderID ,
	          IPPhone ,
	          Status ,
	          Description ,
	          CreateDate ,
	          CreateBy ,
	          UpdateBy
	        )
	VALUES  ( @StaffID , -- StaffID - int
	          @ServiceProviderID , -- ServiceProviderID - int
	          @IPPhone , -- IPPhone - varchar(50)
	          @Status , -- Status - int
	          @Description , -- Description - nvarchar(500)
	          GETDATE() , -- CreateDate - datetime
	          @CreateBy , -- CreateBy - varchar(50)
	          NULL  -- UpdateBy - varchar(50)
	        )
			
			IF @@ROWCOUNT > 0
			BEGIN
			SET @Code = 1;
			SET @Desc =N'Thêm mới '+@IPPhone +N' cho '+@UserName+N' thành công';
			END
			ELSE
			BEGIN
			SET @Code = 0;
			SET @Desc =N'Thêm mới '+@IPPhone +N' cho '+@UserName+N' thất bại';
			END
			result:
			BEGIN
				SELECT @Code AS[Code],@Desc AS [Desc]
			END
END
