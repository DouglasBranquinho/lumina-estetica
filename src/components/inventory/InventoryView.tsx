"use client";

import React, { useState } from "react";
import {
  Package,
  AlertTriangle,
  Plus,
  Search,
  Calendar,
  DollarSign,
  TrendingUp,
  Truck,
  Minus,
  CheckCircle2,
  X,
} from "lucide-react";
import { useClinic } from "@/context/ClinicContext";
import { InventoryItem, InventoryCategory, InventoryType } from "@/types";
import { formatCurrency } from "@/lib/utils";

const categoryLabels: Record<InventoryCategory, string> = {
  cabelo: "Cabelos",
  unhas: "Unhas & Gel",
  cilios: "Cílios / Lashes",
  sobrancelhas: "Sobrancelhas",
  facial: "Facial / Estética",
  descartaveis: "Descartáveis",
};

export const InventoryView: React.FC = () => {
  const { inventory, addInventoryItem, updateInventoryItem } = useClinic();

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [selectedUsageType, setSelectedUsageType] = useState<string>("all");
  const [isNewItemModalOpen, setIsNewItemModalOpen] = useState(false);

  // Form State para Novo Insumo / Produto
  const [name, setName] = useState("");
  const [brand, setBrand] = useState("");
  const [category, setCategory] = useState<InventoryCategory>("cabelo");
  const [usageType, setUsageType] = useState<InventoryType>("insumo_bancada");
  const [currentStock, setCurrentStock] = useState<number>(5);
  const [unit, setUnit] = useState("unidades");
  const [minStockAlert, setMinStockAlert] = useState<number>(2);
  const [lastPurchaseDate, setLastPurchaseDate] = useState(new Date().toISOString().split("T")[0]);
  const [lastPurchasePrice, setLastPurchasePrice] = useState<number>(45.0);
  const [resalePrice, setResalePrice] = useState<number | undefined>(undefined);
  const [supplier, setSupplier] = useState("");
  const [notes, setNotes] = useState("");

  // Métricas do Estoque
  const totalItemsCount = inventory.length;
  const totalStockCostValue = inventory.reduce(
    (acc, item) => acc + item.currentStock * item.lastPurchasePrice,
    0
  );
  const lowStockItems = inventory.filter((item) => item.currentStock <= item.minStockAlert);
  const resaleItems = inventory.filter((item) => item.usageType === "revenda_homecare" || item.usageType === "ambos");

  // Filtros
  const filteredInventory = inventory.filter((item) => {
    const matchesSearch =
      item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.brand.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (item.supplier && item.supplier.toLowerCase().includes(searchTerm.toLowerCase()));

    const matchesCategory = selectedCategory === "all" || item.category === selectedCategory;
    const matchesUsage = selectedUsageType === "all" || item.usageType === selectedUsageType;

    return matchesSearch && matchesCategory && matchesUsage;
  });

  const handleCreateItem = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !brand) return;

    addInventoryItem({
      name,
      brand,
      category,
      usageType,
      currentStock: Number(currentStock),
      unit,
      minStockAlert: Number(minStockAlert),
      lastPurchaseDate,
      lastPurchasePrice: Number(lastPurchasePrice),
      resalePrice: resalePrice ? Number(resalePrice) : undefined,
      supplier,
      notes,
    });

    setIsNewItemModalOpen(false);
    // Reset form
    setName("");
    setBrand("");
    setSupplier("");
    setNotes("");
  };

  const handleStockAdjustment = (id: string, delta: number) => {
    const item = inventory.find((i) => i.id === id);
    if (!item) return;
    const newStock = Math.max(0, item.currentStock + delta);
    updateInventoryItem(id, { currentStock: newStock });
  };

  return (
    <div className="space-y-6">
      {/* Header com Botão de Ação */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-[#EAE5DF]">
        <div>
          <h2 className="font-serif text-xl font-semibold text-[#262220]">
            Controle de Estoque & Insumos
          </h2>
          <p className="text-xs text-[#807770]">
            Gestão de materiais de bancada (consumo interno) e revenda home care com histórico de compras
          </p>
        </div>

        <button
          onClick={() => setIsNewItemModalOpen(true)}
          className="flex items-center space-x-2 px-4 py-2 rounded-lg bg-[#C49B88] hover:bg-[#B38672] text-[#FFFFFF] text-xs font-semibold shadow-sm transition-all active:scale-95 self-start sm:self-auto"
        >
          <Plus size={16} />
          <span>Novo Insumo / Produto</span>
        </button>
      </div>

      {/* Cards de Métricas de Estoque */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {/* Total de Itens */}
        <div className="bg-[#FFFFFF] p-4 rounded-xl border border-[#EAE5DF] shadow-xs flex items-center space-x-3.5">
          <div className="w-10 h-10 rounded-lg bg-[#FAF8F5] border border-[#EAE5DF] flex items-center justify-center text-[#C49B88]">
            <Package size={20} />
          </div>
          <div>
            <p className="text-[11px] font-medium tracking-wide text-[#807770] uppercase">
              Total de Produtos
            </p>
            <span className="text-xl font-semibold text-[#262220] tabular-nums">
              {totalItemsCount}
            </span>
          </div>
        </div>

        {/* Valor Total do Estoque (Custo) */}
        <div className="bg-[#FFFFFF] p-4 rounded-xl border border-[#EAE5DF] shadow-xs flex items-center space-x-3.5">
          <div className="w-10 h-10 rounded-lg bg-[#FAF8F5] border border-[#EAE5DF] flex items-center justify-center text-[#5B8266]">
            <DollarSign size={20} />
          </div>
          <div>
            <p className="text-[11px] font-medium tracking-wide text-[#807770] uppercase">
              Capital em Estoque
            </p>
            <span className="text-xl font-semibold text-[#262220] tabular-nums">
              {formatCurrency(totalStockCostValue)}
            </span>
          </div>
        </div>

        {/* Alerta de Estoque Mínimo */}
        <div className="bg-[#FFFFFF] p-4 rounded-xl border border-[#EAE5DF] shadow-xs flex items-center space-x-3.5">
          <div className="w-10 h-10 rounded-lg bg-[#FAF8F5] border border-[#EAE5DF] flex items-center justify-center text-[#966116]">
            <AlertTriangle size={20} />
          </div>
          <div>
            <p className="text-[11px] font-medium tracking-wide text-[#807770] uppercase">
              Reposição Urgente
            </p>
            <div className="flex items-baseline space-x-1.5">
              <span className="text-xl font-semibold text-[#966116] tabular-nums">
                {lowStockItems.length}
              </span>
              <span className="text-xs text-[#807770]">produtos em baixa</span>
            </div>
          </div>
        </div>

        {/* Produtos de Revenda */}
        <div className="bg-[#FFFFFF] p-4 rounded-xl border border-[#EAE5DF] shadow-xs flex items-center space-x-3.5">
          <div className="w-10 h-10 rounded-lg bg-[#FAF8F5] border border-[#EAE5DF] flex items-center justify-center text-[#3B5B75]">
            <TrendingUp size={20} />
          </div>
          <div>
            <p className="text-[11px] font-medium tracking-wide text-[#807770] uppercase">
              Revenda Home Care
            </p>
            <span className="text-xl font-semibold text-[#262220] tabular-nums">
              {resaleItems.length} itens de balcão
            </span>
          </div>
        </div>
      </div>

      {/* Alerta de Estoque Baixo Destacado */}
      {lowStockItems.length > 0 && (
        <div className="p-4 rounded-xl bg-[#FEF8ED] border border-[#F8E5C4] text-xs text-[#966116] flex items-center justify-between">
          <div className="flex items-center space-x-2.5">
            <AlertTriangle size={17} className="shrink-0" />
            <div>
              <strong>Atenção para o final de semana:</strong>{" "}
              {lowStockItems.map((i) => `${i.name} (${i.currentStock} ${i.unit})`).join(" • ")}
            </div>
          </div>
        </div>
      )}

      {/* Filtros e Busca */}
      <div className="bg-[#FFFFFF] border border-[#EAE5DF] rounded-2xl p-6 shadow-sm space-y-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
          {/* Busca */}
          <div className="relative flex-1">
            <Search
              size={16}
              className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#807770]"
            />
            <input
              type="text"
              placeholder="Buscar por nome do produto, marca ou fornecedor..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 rounded-xl border border-[#EAE5DF] bg-[#FAF8F5] text-xs text-[#262220] focus:outline-none focus:ring-1 focus:ring-[#C49B88]"
            />
          </div>

          {/* Filtro de Categoria */}
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="text-xs bg-[#FAF8F5] border border-[#EAE5DF] rounded-xl px-3 py-2 text-[#262220] font-medium focus:outline-none"
          >
            <option value="all">Todas as Categorias</option>
            <option value="cabelo">Cabelos</option>
            <option value="unhas">Unhas & Gel</option>
            <option value="cilios">Cílios / Lashes</option>
            <option value="sobrancelhas">Sobrancelhas</option>
            <option value="facial">Facial</option>
            <option value="descartaveis">Descartáveis</option>
          </select>

          {/* Filtro de Tipo de Uso */}
          <select
            value={selectedUsageType}
            onChange={(e) => setSelectedUsageType(e.target.value)}
            className="text-xs bg-[#FAF8F5] border border-[#EAE5DF] rounded-xl px-3 py-2 text-[#262220] font-medium focus:outline-none"
          >
            <option value="all">Todos os Tipos</option>
            <option value="insumo_bancada">Insumo de Bancada (Uso Interno)</option>
            <option value="revenda_homecare">Revenda Home Care (Balcão)</option>
          </select>
        </div>

        {/* Tabela de Produtos */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-[#EAE5DF] text-[#807770] uppercase tracking-wider text-[10px] bg-[#FAF8F5]/80">
                <th className="py-3 px-4 rounded-l-lg">Material / Marca</th>
                <th className="py-3 px-4">Setor & Uso</th>
                <th className="py-3 px-4 text-center">Estoque Atual</th>
                <th className="py-3 px-4">Última Compra</th>
                <th className="py-3 px-4">Preço Pago (Custo)</th>
                <th className="py-3 px-4">Revenda / Fornecedor</th>
                <th className="py-3 px-4 text-right rounded-r-lg">Ajuste Rápido</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#F5F2ED]">
              {filteredInventory.map((item) => {
                const isLowStock = item.currentStock <= item.minStockAlert;
                const [y, m, d] = item.lastPurchaseDate.split("-");
                const formattedDate = `${d}/${m}/${y}`;

                return (
                  <tr key={item.id} className="hover:bg-[#FAF8F5]/50 transition-colors">
                    {/* Nome e Marca */}
                    <td className="py-3.5 px-4">
                      <div>
                        <p className="font-semibold text-[#262220]">{item.name}</p>
                        <p className="text-[11px] text-[#807770]">{item.brand}</p>
                        {item.notes && (
                          <p className="text-[10px] text-[#C49B88] mt-0.5">{item.notes}</p>
                        )}
                      </div>
                    </td>

                    {/* Categoria e Tipo */}
                    <td className="py-3.5 px-4">
                      <div className="space-y-1">
                        <span className="inline-block px-2 py-0.5 rounded-full text-[10px] font-medium bg-[#FAF8F5] border border-[#EAE5DF] text-[#544E49]">
                          {categoryLabels[item.category]}
                        </span>
                        <div>
                          <span
                            className={`text-[10px] font-semibold ${
                              item.usageType === "revenda_homecare"
                                ? "text-[#3B5B75]"
                                : "text-[#807770]"
                            }`}
                          >
                            {item.usageType === "revenda_homecare"
                              ? "Revenda de Balcão"
                              : "Insumo de Bancada"}
                          </span>
                        </div>
                      </div>
                    </td>

                    {/* Estoque Atual */}
                    <td className="py-3.5 px-4 text-center">
                      <div className="inline-flex flex-col items-center">
                        <span
                          className={`px-2.5 py-1 rounded-lg font-semibold tabular-nums ${
                            isLowStock
                              ? "bg-[#FEF8ED] text-[#966116] border border-[#F8E5C4]"
                              : "bg-[#EDF4EF] text-[#3C6547] border border-[#CBE0D2]"
                          }`}
                        >
                          {item.currentStock} {item.unit}
                        </span>
                        {isLowStock && (
                          <span className="text-[9px] text-[#966116] font-semibold mt-0.5">
                            Mínimo: {item.minStockAlert}
                          </span>
                        )}
                      </div>
                    </td>

                    {/* Data da Última Compra */}
                    <td className="py-3.5 px-4 text-[#544E49] tabular-nums">
                      <div className="flex items-center space-x-1">
                        <Calendar size={12} className="text-[#807770]" />
                        <span>{formattedDate}</span>
                      </div>
                    </td>

                    {/* Preço Pago */}
                    <td className="py-3.5 px-4 font-semibold text-[#262220] tabular-nums">
                      {formatCurrency(item.lastPurchasePrice)}
                      <span className="text-[10px] text-[#807770] font-normal block">
                        por {item.unit.replace(/s$/, "")}
                      </span>
                    </td>

                    {/* Revenda / Fornecedor */}
                    <td className="py-3.5 px-4">
                      {item.resalePrice ? (
                        <div>
                          <span className="font-semibold text-[#3C6547] tabular-nums">
                            Venda: {formatCurrency(item.resalePrice)}
                          </span>
                          <span className="text-[10px] text-[#807770] block">
                            Lucro: {formatCurrency(item.resalePrice - item.lastPurchasePrice)}
                          </span>
                        </div>
                      ) : (
                        <div className="flex items-center space-x-1 text-[#807770]">
                          <Truck size={12} />
                          <span className="truncate max-w-[120px]">
                            {item.supplier || "Fornecedor padrão"}
                          </span>
                        </div>
                      )}
                    </td>

                    {/* Ajuste Rápido de Baixa / Entrada */}
                    <td className="py-3.5 px-4 text-right">
                      <div className="inline-flex items-center space-x-1 bg-[#FAF8F5] p-1 rounded-lg border border-[#EAE5DF]">
                        <button
                          onClick={() => handleStockAdjustment(item.id, -1)}
                          className="w-6 h-6 rounded bg-[#FFFFFF] hover:bg-[#EAE5DF] text-[#544E49] flex items-center justify-center transition-colors"
                          title="Dar baixa (consumido no atendimento)"
                        >
                          <Minus size={12} />
                        </button>
                        <button
                          onClick={() => handleStockAdjustment(item.id, 1)}
                          className="w-6 h-6 rounded bg-[#FFFFFF] hover:bg-[#EAE5DF] text-[#544E49] flex items-center justify-center transition-colors"
                          title="Dar entrada (chegou compra)"
                        >
                          <Plus size={12} />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal / Drawer para Cadastrar Novo Insumo */}
      {isNewItemModalOpen && (
        <div className="fixed inset-0 z-50 overflow-hidden bg-[#262220]/30 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-[#FFFFFF] w-full max-w-lg rounded-2xl border border-[#EAE5DF] shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200">
            <div className="p-5 border-b border-[#EAE5DF] bg-[#FAF8F5] flex items-center justify-between">
              <div>
                <span className="text-[10px] font-semibold uppercase tracking-wider text-[#C49B88]">
                  Estoque Inteligente
                </span>
                <h3 className="font-serif text-lg font-semibold text-[#262220]">
                  Cadastrar Material ou Produto
                </h3>
              </div>
              <button
                onClick={() => setIsNewItemModalOpen(false)}
                className="p-2 rounded-full hover:bg-[#EAE5DF] text-[#807770]"
              >
                <X size={18} />
              </button>
            </div>

            <form onSubmit={handleCreateItem} className="p-6 space-y-4 text-xs max-h-[80vh] overflow-y-auto">
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="font-semibold text-[#262220]">Nome do Produto</label>
                  <input
                    type="text"
                    placeholder="Ex: Gel Construtor Classic Nude"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full p-2.5 rounded-lg border border-[#EAE5DF] bg-[#FAF8F5] focus:ring-1 focus:ring-[#C49B88]"
                    required
                  />
                </div>

                <div className="space-y-1">
                  <label className="font-semibold text-[#262220]">Marca / Fabricante</label>
                  <input
                    type="text"
                    placeholder="Ex: Vòlia, L'Oréal, Nagaraku"
                    value={brand}
                    onChange={(e) => setBrand(e.target.value)}
                    className="w-full p-2.5 rounded-lg border border-[#EAE5DF] bg-[#FAF8F5] focus:ring-1 focus:ring-[#C49B88]"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="font-semibold text-[#262220]">Setor / Categoria</label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value as InventoryCategory)}
                    className="w-full p-2.5 rounded-lg border border-[#EAE5DF] bg-[#FAF8F5]"
                  >
                    <option value="cabelo">Cabelos</option>
                    <option value="unhas">Unhas & Gel</option>
                    <option value="cilios">Cílios / Lashes</option>
                    <option value="sobrancelhas">Sobrancelhas</option>
                    <option value="facial">Facial</option>
                    <option value="descartaveis">Descartáveis</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="font-semibold text-[#262220]">Tipo de Utilização</label>
                  <select
                    value={usageType}
                    onChange={(e) => setUsageType(e.target.value as InventoryType)}
                    className="w-full p-2.5 rounded-lg border border-[#EAE5DF] bg-[#FAF8F5]"
                  >
                    <option value="insumo_bancada">Insumo de Bancada (Consumo Interno)</option>
                    <option value="revenda_homecare">Revenda Home Care (Balcão)</option>
                    <option value="ambos">Ambos (Uso Interno e Revenda)</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div className="space-y-1">
                  <label className="font-semibold text-[#262220]">Qtd Atual</label>
                  <input
                    type="number"
                    value={currentStock}
                    onChange={(e) => setCurrentStock(Number(e.target.value))}
                    className="w-full p-2.5 rounded-lg border border-[#EAE5DF] bg-[#FAF8F5]"
                    min={0}
                    required
                  />
                </div>

                <div className="space-y-1">
                  <label className="font-semibold text-[#262220]">Unidade</label>
                  <input
                    type="text"
                    placeholder="un, tubos, potes, caixas"
                    value={unit}
                    onChange={(e) => setUnit(e.target.value)}
                    className="w-full p-2.5 rounded-lg border border-[#EAE5DF] bg-[#FAF8F5]"
                    required
                  />
                </div>

                <div className="space-y-1">
                  <label className="font-semibold text-[#262220]">Alerta Mínimo</label>
                  <input
                    type="number"
                    value={minStockAlert}
                    onChange={(e) => setMinStockAlert(Number(e.target.value))}
                    className="w-full p-2.5 rounded-lg border border-[#EAE5DF] bg-[#FAF8F5]"
                    min={1}
                    required
                  />
                </div>
              </div>

              {/* Última Compra */}
              <div className="p-3.5 rounded-xl border border-[#EAE5DF] bg-[#FAF8F5] space-y-3">
                <p className="font-semibold text-[#262220]">Dados da Última Compra (Custo)</p>
                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-1">
                    <label className="text-[11px] text-[#807770]">Data da Compra</label>
                    <input
                      type="date"
                      value={lastPurchaseDate}
                      onChange={(e) => setLastPurchaseDate(e.target.value)}
                      className="w-full p-2 rounded-lg border border-[#EAE5DF] bg-[#FFFFFF]"
                      required
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-[11px] text-[#807770]">Preço Pago Unitário (R$)</label>
                    <input
                      type="number"
                      step="0.01"
                      placeholder="0.00"
                      value={lastPurchasePrice}
                      onChange={(e) => setLastPurchasePrice(Number(e.target.value))}
                      className="w-full p-2 rounded-lg border border-[#EAE5DF] bg-[#FFFFFF]"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-[11px] text-[#807770]">Fornecedor / Distribuidor</label>
                  <input
                    type="text"
                    placeholder="Ex: Distribuidora Vòlia SP, Wella Pro"
                    value={supplier}
                    onChange={(e) => setSupplier(e.target.value)}
                    className="w-full p-2 rounded-lg border border-[#EAE5DF] bg-[#FFFFFF]"
                  />
                </div>
              </div>

              {/* Se for Revenda */}
              {(usageType === "revenda_homecare" || usageType === "ambos") && (
                <div className="space-y-1">
                  <label className="font-semibold text-[#262220]">Preço de Venda ao Consumidor (R$)</label>
                  <input
                    type="number"
                    step="0.01"
                    placeholder="Preço no balcão"
                    value={resalePrice || ""}
                    onChange={(e) => setResalePrice(Number(e.target.value))}
                    className="w-full p-2.5 rounded-lg border border-[#EAE5DF] bg-[#FAF8F5]"
                  />
                </div>
              )}

              <div className="space-y-1">
                <label className="font-semibold text-[#262220]">Observações de Rendimento ou Aplicação</label>
                <textarea
                  rows={2}
                  placeholder="Ex: Rende em média 15 manutenções; armazenar ao abrigo de luz..."
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  className="w-full p-2 rounded-lg border border-[#EAE5DF] bg-[#FAF8F5]"
                />
              </div>

              <div className="flex justify-end space-x-2 pt-3 border-t border-[#EAE5DF]">
                <button
                  type="button"
                  onClick={() => setIsNewItemModalOpen(false)}
                  className="px-4 py-2 rounded-lg border border-[#EAE5DF] text-[#544E49]"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-lg bg-[#C49B88] hover:bg-[#B38672] text-[#FFFFFF] font-semibold"
                >
                  Salvar no Estoque
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
