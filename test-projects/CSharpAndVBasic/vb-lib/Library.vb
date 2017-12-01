' Mybox module
Public Module mybox
    ' Class box
    Public Class Box
        Public length As Double   ' Length of a box
        Public breadth As Double   ' Breadth of a box
        Public height As Double    ' Height of a box
    End Class
    Sub Main()
        Dim Box1 As Box = New Box()        ' Declare Box1 of type Box
        Dim Box2 As Box = New Box()        ' Declare Box2 of type Box
        Dim volume As Double = 0.0     ' Store the volume of a box here
        ' box 1 specification
        Box1.height = 5.0
        Box1.length = 6.0
        Box1.breadth = 7.0
        ' box 2 specification
        Box2.height = 10.0
        Box2.length = 12.0
        Box2.breadth = 13.0
        'volume of box 1
        volume = Box1.height * Box1.length * Box1.breadth
        Console.WriteLine("Volume of Box1 : {0}", volume)
        'volume of box 2
        volume = Box2.height * Box2.length * Box2.breadth
        Console.WriteLine("Volume of Box2 : {0}", volume)
        Console.ReadKey()
    End Sub
End Module