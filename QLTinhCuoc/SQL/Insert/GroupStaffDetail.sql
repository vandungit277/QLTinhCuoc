INSERT dbo.GroupStaffDetail
        ( StaffID ,
          GroupsID ,
          Status ,
          CreateDate ,
          Description
        )
VALUES  ( 10 , -- StaffID - int
          3 , -- GroupsID - int
          1 , -- Status - int
          GETDATE() , -- CreateDate - datetime
          N'Admin'  -- Description - nvarchar(500)
        )