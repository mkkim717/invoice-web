import { Document, Font, Page, StyleSheet, Text, View } from "@react-pdf/renderer";
import { formatDate, formatKRW } from "@/lib/format";
import type { Invoice, InvoiceStatus } from "@/lib/types";

Font.register({
  family: "NotoSansKR",
  fonts: [
    { src: "/fonts/NotoSansKR-Regular.otf", fontWeight: "normal" },
    { src: "/fonts/NotoSansKR-Bold.otf", fontWeight: "bold" },
  ],
});

const STATUS_LABEL: Record<InvoiceStatus, string> = {
  draft: "초안",
  sent: "발송됨",
  accepted: "수락됨",
  expired: "만료됨",
};

const styles = StyleSheet.create({
  page: {
    padding: 40,
    fontFamily: "NotoSansKR",
    fontSize: 10,
    color: "#111827",
    backgroundColor: "#ffffff",
  },
  headerLabel: {
    fontSize: 11,
    color: "#6b7280",
    marginBottom: 6,
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 10,
  },
  statusBadge: {
    alignSelf: "flex-start",
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 99,
    backgroundColor: "#e5e7eb",
    marginBottom: 10,
  },
  statusText: {
    fontSize: 9,
    color: "#374151",
  },
  metaRow: {
    flexDirection: "row",
    marginBottom: 3,
  },
  metaLabel: {
    width: 60,
    color: "#6b7280",
  },
  metaValue: {
    flex: 1,
  },
  divider: {
    borderBottomWidth: 1,
    borderBottomColor: "#e5e7eb",
    marginVertical: 14,
  },
  twoCol: {
    flexDirection: "row",
  },
  col: {
    flex: 1,
  },
  colRight: {
    flex: 1,
    paddingLeft: 16,
  },
  sectionTitle: {
    fontSize: 9,
    color: "#6b7280",
    marginBottom: 5,
    letterSpacing: 0.5,
  },
  sectionValue: {
    fontSize: 11,
    fontWeight: "bold",
    marginBottom: 2,
  },
  sectionSub: {
    color: "#6b7280",
    marginTop: 1,
  },
  tableContainer: {
    borderWidth: 1,
    borderColor: "#e5e7eb",
    borderRadius: 4,
    overflow: "hidden",
  },
  tableHeader: {
    flexDirection: "row",
    backgroundColor: "#f9fafb",
    borderBottomWidth: 1,
    borderBottomColor: "#e5e7eb",
    paddingVertical: 7,
    paddingHorizontal: 10,
  },
  tableRow: {
    flexDirection: "row",
    borderBottomWidth: 1,
    borderBottomColor: "#f3f4f6",
    paddingVertical: 7,
    paddingHorizontal: 10,
  },
  tableRowLast: {
    flexDirection: "row",
    paddingVertical: 7,
    paddingHorizontal: 10,
  },
  headerText: {
    fontSize: 9,
    color: "#6b7280",
    fontWeight: "bold",
  },
  cellName: {
    flex: 1,
  },
  cellQty: {
    width: 36,
    textAlign: "right",
  },
  cellPrice: {
    width: 80,
    textAlign: "right",
  },
  cellAmount: {
    width: 82,
    textAlign: "right",
    fontWeight: "bold",
  },
  totalBox: {
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "center",
    marginTop: 14,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: "#e5e7eb",
  },
  totalLabel: {
    color: "#6b7280",
    marginRight: 16,
    fontSize: 11,
  },
  totalAmount: {
    fontSize: 18,
    fontWeight: "bold",
  },
  memoBox: {
    marginTop: 18,
    padding: 12,
    backgroundColor: "#f9fafb",
    borderRadius: 4,
  },
  memoTitle: {
    color: "#6b7280",
    marginBottom: 5,
    fontSize: 9,
    letterSpacing: 0.5,
  },
  memoText: {
    lineHeight: 1.6,
    color: "#374151",
  },
});

export function InvoicePdfDocument({ invoice }: { invoice: Invoice }) {
  return (
    <Document title={invoice.title} author={invoice.sender_name}>
      <Page size="A4" style={styles.page}>
        {/* 헤더 */}
        <View>
          <Text style={styles.headerLabel}>견적서</Text>
          <Text style={styles.headerTitle}>{invoice.title}</Text>
          <View style={styles.statusBadge}>
            <Text style={styles.statusText}>{STATUS_LABEL[invoice.status]}</Text>
          </View>
          <View style={styles.metaRow}>
            <Text style={styles.metaLabel}>발행일</Text>
            <Text style={styles.metaValue}>{formatDate(invoice.issue_date)}</Text>
          </View>
          <View style={styles.metaRow}>
            <Text style={styles.metaLabel}>유효기간</Text>
            <Text style={styles.metaValue}>
              {invoice.due_date ? formatDate(invoice.due_date) : "미지정"}
            </Text>
          </View>
        </View>

        <View style={styles.divider} />

        {/* 발신자 / 고객사 */}
        <View style={styles.twoCol}>
          <View style={styles.col}>
            <Text style={styles.sectionTitle}>공급자</Text>
            <Text style={styles.sectionValue}>{invoice.sender_name}</Text>
            {invoice.sender_contact ? (
              <Text style={styles.sectionSub}>{invoice.sender_contact}</Text>
            ) : null}
          </View>
          <View style={styles.colRight}>
            <Text style={styles.sectionTitle}>공급받는자</Text>
            <Text style={styles.sectionValue}>{invoice.client_name}</Text>
          </View>
        </View>

        <View style={styles.divider} />

        {/* 품목 테이블 */}
        <View style={styles.tableContainer}>
          <View style={styles.tableHeader} fixed>
            <Text style={[styles.cellName, styles.headerText]}>품목명</Text>
            <Text style={[styles.cellQty, styles.headerText]}>수량</Text>
            <Text style={[styles.cellPrice, styles.headerText]}>단가</Text>
            <Text style={[styles.cellAmount, styles.headerText]}>금액</Text>
          </View>
          {invoice.items.map((item, index) => {
            const isLast = index === invoice.items.length - 1;
            return (
              <View
                key={`${item.name}-${index}`}
                style={isLast ? styles.tableRowLast : styles.tableRow}
                wrap={false}
              >
                <Text style={styles.cellName}>{item.name}</Text>
                <Text style={styles.cellQty}>{item.quantity}</Text>
                <Text style={styles.cellPrice}>{formatKRW(item.unit_price)}</Text>
                <Text style={styles.cellAmount}>{formatKRW(item.amount)}</Text>
              </View>
            );
          })}
        </View>

        {/* 합계 */}
        <View style={styles.totalBox}>
          <Text style={styles.totalLabel}>합계 금액</Text>
          <Text style={styles.totalAmount}>{formatKRW(invoice.total_amount)}</Text>
        </View>

        {/* 메모 */}
        {invoice.memo ? (
          <View style={styles.memoBox}>
            <Text style={styles.memoTitle}>비고</Text>
            <Text style={styles.memoText}>{invoice.memo}</Text>
          </View>
        ) : null}
      </Page>
    </Document>
  );
}
