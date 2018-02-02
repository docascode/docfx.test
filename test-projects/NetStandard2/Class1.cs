using System;

namespace NetStandard2
{
    /// <summary>
    /// C# 7.2 features
    /// </summary>
    /// <seealso cref="Enum"/>
    public class Class1
    {
        private static Class1 origin = new Class1();

        public static ref readonly Class1 Origin => ref origin;

        public Class1()
        {

        }
        public Class1(int i, in Class1 transform)
        {

        }

        private protected void ShouldNotBeInDocs()
        {

        }
    }

    /// <summary>
    /// Enum
    /// </summary>
    /// <seealso cref="Class1"/>
    public enum Enum
    { }
}
