import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { CheckCircle, XCircle } from "lucide-react"
import { COLORS } from '../constants/colors'

type ResumeItem = {
  title: string
  value: string
  color: string
}

export function FinancesResume() {
  const resume: ResumeItem[] = [
    { title: "Saldo Actual", value: "1000 Mt", color: COLORS.green[600] },
    { title: "Despesas Totais", value: "500 Mt", color: COLORS.blue[600] },
    { title: "Rendimento Mensal", value: "200 Mt", color: COLORS.yellow[600] },
  ]

  // Função auxiliar para converter "1000 Mt" -> 1000
  const toNumber = (str: string) =>
    parseFloat(str.replace(/[^\d.-]/g, "")) || 0

  const saldo = toNumber(resume.find((i) => i.title === "Saldo Actual")?.value || "0")
  const despesas = toNumber(resume.find((i) => i.title === "Despesas Totais")?.value || "0")
  const rendimento = toNumber(resume.find((i) => i.title === "Rendimento Mensal")?.value || "0")

  // Cálculo da situação financeira
  const situacaoFinanceira = saldo + rendimento - despesas
  const situationPositive = situacaoFinanceira > 0

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {resume.map((item) => (
        <FinanceCard
          key={item.title}
          title={item.title}
          value={item.value}
          color={item.color}
        />
      ))}

      <Card
        className="text-white"
        style={{ backgroundColor: situationPositive ? COLORS.green[700] : COLORS.black[700] }}
      >
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Situação Financeira</CardTitle>
          {situationPositive ? (
            <CheckCircle className="w-5 h-5 text-white" />
          ) : (
            <XCircle className="w-5 h-5 text-white" />
          )}
        </CardHeader>
        <CardContent>
          <p className="text-lg font-semibold">
            {situationPositive ? "Positivo" : "Negativo"}
          </p>
          <p className="text-sm opacity-80">
            Resultado: {situacaoFinanceira} Mt
          </p>
        </CardContent>
      </Card>
    </div>
  )
}

function FinanceCard({
  title,
  value,
  color,
}: {
  title: string
  value: string
  color: string
}) {
  return (
    <Card className="text-white hover:shadow-lg transition-shadow duration-200" style={{ backgroundColor: color }}>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-xl font-bold">{value}</p>
      </CardContent>
    </Card>
  )
}
