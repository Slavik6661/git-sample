package com.company;

import java.util.Arrays;
import java.util.Comparator;
import java.util.List;
import java.util.Scanner;
import java.util.stream.Collectors;

public class Main {
    static Scanner scanner = new Scanner(System.in);



    public static void main(String[] args) {
        String s;
        System.out.println("Введите 1 число");
        s=scanner.next();

        String s2;
        System.out.println("Введите 2 число");
        s2=scanner.next();

        if(  s.matches("[-+]?\\d+")==true) {
            System.out.println("Это число");
            int num1 = Integer.parseInt(s.trim());
            int num2 = Integer.parseInt(s2.trim());
            char operation = getOperation();
            int result = calc(num1,num2,operation);
            System.out.println("Результат операции: "+result);
        }
        else {
            System.out.println("Это римское число");
            int number= romanToArabic(s);
            int number2= romanToArabic(s2);
            char operation = getOperation();
            int result = calc(number,number2,operation);

            System.out.print("Результат операции: "+result);
        }





    }
    enum RomanNumeral {
        I(1), II(2),III(3),IV(4), V(5),VI(6),VII(7),VIII(8), IX(9), X(10),
        XL(40), L(50), XC(90), C(100),
        CD(400), D(500), CM(900), M(1000);
        private int value;

        RomanNumeral(int value) {
            this.value = value;
        }

        public int getValue() {
            return value;
        }

        public static List getReverseSortedValues() {
            return Arrays.stream(values())
                    .sorted(Comparator.comparing((RomanNumeral e) -> e.value).reversed())
                    .collect(Collectors.toList());
        }

    }

    public static int romanToArabic(String input) {
        String romanNumeral = input.toUpperCase();
        int result = 0;

        List romanNumerals = RomanNumeral.getReverseSortedValues();

        int i = 0;

        while ((romanNumeral.length() > 0) && (i < romanNumerals.size())) {
            RomanNumeral symbol = (RomanNumeral) romanNumerals.get(i);
            if (romanNumeral.startsWith(symbol.name())) {
                result += symbol.getValue();
                romanNumeral = romanNumeral.substring(symbol.name().length());
            } else {
                i++;
            }
        }

        if (romanNumeral.length() > 0) {
            throw new IllegalArgumentException(input + " cannot be converted to a Roman Numeral");
        }

        return result;
    }

    /*public static int getInt(){
        System.out.println("Введите число:");
        int num;
        if(scanner.hasNext()){
            num = scanner.nextInt();

        }
        else {

            System.out.println("Вы допустили ошибку при вводе числа. Попробуйте еще раз.");
            scanner.next();//рекурсия
            num = getInt();

        }
        return num;
    }
    */


    private static char getOperation() {
        System.out.println("Введите операцию:");
        char operation;
        if(scanner.hasNext()){
            operation = scanner.next().charAt(0);
        } else {
            System.out.println("Вы допустили ошибку при вводе операции. Попробуйте еще раз.");
            scanner.next();//рекурсия
            operation = getOperation();
        }
        return operation;
    }


    private static int calc(int num1, int num2, char operation) {
       int result;
        switch (operation){
            case '+':
                result = num1+num2;
                break;
            case '-':
                result = num1-num2;
                break;
            case '*':
                result = num1*num2;
                break;
            case '/':
                result = num1/num2;
                break;
            default:
                System.out.println("Операция не распознана. Повторите ввод.");
                result = calc(num1, num2, getOperation());//рекурсия
        }
        return result;
    }
}
