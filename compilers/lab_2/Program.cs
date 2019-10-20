using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Reflection.Emit;
using System.Text;
using System.Threading.Tasks;
using Mono.Cecil;
using Mono.Cecil.Cil;
using OpCodes = Mono.Cecil.Cil.OpCodes;

namespace ConsoleApp1
{
	class Program
	{
		public static class A_sbyte_меньше_или_равно
		{
			public static bool gg(sbyte a, sbyte b)
			{
				return a <= b;
			}
		}
		public static class A_ushort_сложение
		{
			public static ushort gg(ushort a, ushort b)
			{
				return (ushort)(a + b);
			}
		}
		public static class A_ulong_умножение
		{
			public static ulong gg(ulong a, ulong b)
			{
				return a * b;
			}
		}
		public static class A_int_checked_умножение
		{
			public static int gg(int a, int b)
			{
				return checked(a * b);
			}
		}
		public static class A_decimal_меньше
		{
			public static bool gg(decimal a, decimal b)
			{
				return a < b;
			}
		}
		public static class LogicalOperators
		{
			static bool v()
			{
				System.Console.WriteLine(1);
				return true;
			}
			public static bool Go()
			{
				return v() && v() || !v();
			}
		}
		static void Main(string[] args)
		{
			TaskOne();
			TaskTwo();
			TaskThree();
			TaskFour();
			TaskFive();
			TaskSix();
		}
		static void TaskOne()
		{
			var module = ModuleDefinition.CreateModule("taskOne", ModuleKind.Dll);
			var ASbyteComp = new TypeDefinition("", "A_sbyte_меньше_или_равно", TypeAttributes.Public | TypeAttributes.AnsiClass | TypeAttributes.AutoLayout | TypeAttributes.BeforeFieldInit | TypeAttributes.Sealed, module.TypeSystem.Object);
			module.Types.Add(ASbyteComp);
			var gg = new MethodDefinition("gg", MethodAttributes.Static | MethodAttributes.Public | MethodAttributes.HideBySig, module.TypeSystem.Boolean);
			ASbyteComp.Methods.Add(gg);
			var a = new ParameterDefinition("a", ParameterAttributes.None, module.ImportReference(typeof(sbyte)));
			gg.Parameters.Add(a);
			var b = new ParameterDefinition("b", ParameterAttributes.None, module.ImportReference(typeof(sbyte)));
			gg.Parameters.Add(b);
			var cil = gg.Body.GetILProcessor();

			cil.Emit(OpCodes.Ldarg, a);
			cil.Emit(OpCodes.Ldarg, b);
			cil.Emit(OpCodes.Cgt);
			cil.Emit(OpCodes.Ldc_I4, 0);
			cil.Emit(OpCodes.Ceq);

			cil.Emit(OpCodes.Ret);

			module.Write("out1.dll");
			var myInc = (Func<sbyte, sbyte, bool>)System.Reflection
				.Assembly.LoadFrom("out1.dll")
				.GetType("A_sbyte_меньше_или_равно")
				.GetMethod("gg")
				.CreateDelegate(typeof(Func<sbyte, sbyte, bool>));
		}
		static void TaskTwo()
		{
			var module = ModuleDefinition.CreateModule("taskTwo", ModuleKind.Dll);
			var AUshortSum = new TypeDefinition("", "A_ushort_сложение", TypeAttributes.Public | TypeAttributes.AnsiClass | TypeAttributes.AutoLayout | TypeAttributes.BeforeFieldInit | TypeAttributes.Sealed, module.TypeSystem.Object);
			module.Types.Add(AUshortSum);
			var gg = new MethodDefinition("gg", MethodAttributes.Static | MethodAttributes.Public | MethodAttributes.HideBySig, module.TypeSystem.UInt16);
			AUshortSum.Methods.Add(gg);
			var a = new ParameterDefinition("a", ParameterAttributes.None, module.ImportReference(typeof(ushort)));
			gg.Parameters.Add(a);
			var b = new ParameterDefinition("b", ParameterAttributes.None, module.ImportReference(typeof(ushort)));
			gg.Parameters.Add(b);
			var cil = gg.Body.GetILProcessor();

			cil.Emit(OpCodes.Ldarg, a);
			cil.Emit(OpCodes.Ldarg, b);
			cil.Emit(OpCodes.Add);
			cil.Emit(OpCodes.Conv_U2);

			cil.Emit(OpCodes.Ret);

			module.Write("out2.dll");
			var myInc = (Func<ushort, ushort, ushort>)System.Reflection
				.Assembly.LoadFrom("out2.dll")
				.GetType("A_ushort_сложение")
				.GetMethod("gg")
				.CreateDelegate(typeof(Func<ushort, ushort, ushort>));
		}
		static void TaskThree()
		{
			var module = ModuleDefinition.CreateModule("taskThree", ModuleKind.Dll);
			var AUlongMult = new TypeDefinition("", "A_ulong_умножение", TypeAttributes.Public | TypeAttributes.AnsiClass | TypeAttributes.AutoLayout | TypeAttributes.BeforeFieldInit | TypeAttributes.Sealed, module.TypeSystem.Object);
			module.Types.Add(AUlongMult);
			var gg = new MethodDefinition("gg", MethodAttributes.Static | MethodAttributes.Public | MethodAttributes.HideBySig, module.TypeSystem.UInt64);
			AUlongMult.Methods.Add(gg);
			var a = new ParameterDefinition("a", ParameterAttributes.None, module.ImportReference(typeof(ulong)));
			gg.Parameters.Add(a);
			var b = new ParameterDefinition("b", ParameterAttributes.None, module.ImportReference(typeof(ulong)));
			gg.Parameters.Add(b);
			var cil = gg.Body.GetILProcessor();

			cil.Emit(OpCodes.Ldarg, a);
			cil.Emit(OpCodes.Ldarg, b);
			cil.Emit(OpCodes.Mul);

			cil.Emit(OpCodes.Ret);

			module.Write("out3.dll");
			var myInc = (Func<ulong, ulong, ulong>)System.Reflection
				.Assembly.LoadFrom("out3.dll")
				.GetType("A_ulong_умножение")
				.GetMethod("gg")
				.CreateDelegate(typeof(Func<ulong, ulong, ulong>));
		}
		static void TaskFour()
		{
			var module = ModuleDefinition.CreateModule("taskFour", ModuleKind.Dll);
			var AbyteMult = new TypeDefinition("", "A_int_checked_умножение", TypeAttributes.Public | TypeAttributes.AnsiClass | TypeAttributes.AutoLayout | TypeAttributes.BeforeFieldInit | TypeAttributes.Sealed, module.TypeSystem.Object);
			module.Types.Add(AbyteMult);
			var gg = new MethodDefinition("gg", MethodAttributes.Static | MethodAttributes.Public | MethodAttributes.HideBySig, module.TypeSystem.Int32);
			AbyteMult.Methods.Add(gg);
			var a = new ParameterDefinition("a", ParameterAttributes.None, module.ImportReference(typeof(int)));
			gg.Parameters.Add(a);
			var b = new ParameterDefinition("b", ParameterAttributes.None, module.ImportReference(typeof(int)));
			gg.Parameters.Add(b);
			var cil = gg.Body.GetILProcessor();

			cil.Emit(OpCodes.Ldarg, a);
			cil.Emit(OpCodes.Ldarg, b);
			cil.Emit(OpCodes.Mul_Ovf);

			cil.Emit(OpCodes.Ret);

			module.Write("out4.dll");
			var myInc = (Func<int, int, int>)System.Reflection
				.Assembly.LoadFrom("out4.dll")
				.GetType("A_int_checked_умножение")
				.GetMethod("gg")
				.CreateDelegate(typeof(Func<int, int, int>));
		}
		static void TaskFive()
		{
			var module = ModuleDefinition.CreateModule("taskFive", ModuleKind.Dll);
			var AbyteMult = new TypeDefinition("", "A_decimal_меньше", TypeAttributes.Public | TypeAttributes.AnsiClass | TypeAttributes.AutoLayout | TypeAttributes.BeforeFieldInit | TypeAttributes.Sealed, module.TypeSystem.Object);
			module.Types.Add(AbyteMult);
			var gg = new MethodDefinition("gg", MethodAttributes.Static | MethodAttributes.Public | MethodAttributes.HideBySig, module.TypeSystem.Boolean);
			AbyteMult.Methods.Add(gg);
			var a = new ParameterDefinition("a", ParameterAttributes.None, module.ImportReference(typeof(decimal)));
			gg.Parameters.Add(a);
			var b = new ParameterDefinition("b", ParameterAttributes.None, module.ImportReference(typeof(decimal)));
			gg.Parameters.Add(b);
			var cil = gg.Body.GetILProcessor();

			cil.Emit(OpCodes.Ldarg, a);
			cil.Emit(OpCodes.Ldarg, b);
			cil.Emit(OpCodes.Call, module.ImportReference(typeof(decimal).GetMethod("op_LessThan", new Type[] { typeof(decimal), typeof(decimal) })));

			cil.Emit(OpCodes.Ret);

			module.Write("out5.dll");
			var myInc = (Func<decimal, decimal, bool>)System.Reflection
				.Assembly.LoadFrom("out5.dll")
				.GetType("A_decimal_меньше")
				.GetMethod("gg")
				.CreateDelegate(typeof(Func<decimal, decimal, bool>));
		}
		static void TaskSix()
		{
			var module = ModuleDefinition.CreateModule("taskSix", ModuleKind.Dll);
			var loperators = new TypeDefinition("", "LogicalOperators", TypeAttributes.AnsiClass | TypeAttributes.AutoLayout | TypeAttributes.BeforeFieldInit | TypeAttributes.Sealed | TypeAttributes.NestedPublic | TypeAttributes.Abstract, module.TypeSystem.Object);
			module.Types.Add(loperators);
			var v = new MethodDefinition("v", MethodAttributes.Static | MethodAttributes.Private | MethodAttributes.HideBySig, module.TypeSystem.Boolean);
			loperators.Methods.Add(v);
			var go = new MethodDefinition("go", MethodAttributes.Static | MethodAttributes.Public | MethodAttributes.HideBySig, module.TypeSystem.Boolean);
			loperators.Methods.Add(go);


			var vCil = v.Body.GetILProcessor();
			
			vCil.Emit(OpCodes.Ldc_I4, 1);
			vCil.Emit(OpCodes.Call, module.ImportReference(typeof(Console).GetMethod("WriteLine", new[] { typeof(int) })));
			vCil.Emit(OpCodes.Ldc_I4, 1);
			vCil.Emit(OpCodes.Ret);


			var ifEnd = Instruction.Create(OpCodes.Nop);
			var funcEnd = Instruction.Create(OpCodes.Nop);

			var goCil = go.Body.GetILProcessor();
			goCil.Emit(OpCodes.Call, v);
			goCil.Emit(OpCodes.Brfalse, ifEnd);

			goCil.Emit(OpCodes.Call, module.ImportReference(v));
			goCil.Emit(OpCodes.Brtrue, funcEnd);

			goCil.Append(ifEnd);
			goCil.Emit(OpCodes.Call, module.ImportReference(v));
			goCil.Emit(OpCodes.Ldc_I4, 0);
			goCil.Emit(OpCodes.Ceq);
			goCil.Emit(OpCodes.Ret);

			goCil.Append(funcEnd);
			goCil.Emit(OpCodes.Ldc_I4, 1);
			goCil.Emit(OpCodes.Ret);

			module.Write("out6.dll");
		}
	}
}
