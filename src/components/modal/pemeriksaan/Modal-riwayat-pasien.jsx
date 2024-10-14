import React from "react";
import { useMemo, useState, useEffect, useCallback } from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Pagination,
} from "@nextui-org/react";
import { ModalDetailRiwayatPasien } from "./Modal-detail-riwayat-pasien";
import { getHistoryPasien } from "@/services/data-pasien";
import { formatDate } from "@/lib/constants";

export const ModalHistoryPasien = ({ idPasien }) => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);
  const rowsPerPage = 5;

  const pages = Math.ceil(data.length / rowsPerPage);

  const items = useMemo(() => {
    const start = (page - 1) * rowsPerPage;
    const end = start + rowsPerPage;

    return data.slice(start, end);
  }, [page, data]);

  const fetchData = useCallback(async () => {
    try {
      const res = await getHistoryPasien(idPasien);
      setData(res.filter((item) => item.status === "Pembayaran Telah Selesai") || []);
    } catch (error) {
      console.error("Error fetching patient history:", error);
    }
  }, [idPasien]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);
  
  return (
    <>
      <button
        onClick={onOpen}
        className="text-indigo-500 hover:underline font-semibold text-sm"
      >
        History Pasien
      </button>
      <Modal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        isDismissable={false}
        isKeyboardDismissDisabled={true}
        size="full"
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                Riwayat Pasien
              </ModalHeader>
              <ModalBody>
                <Table
                  aria-label="Tabel Riwayat Pasien"
                  bottomContent={
                    <div className="flex w-full justify-center min-h">
                      <Pagination
                        isCompact
                        showControls
                        showShadow
                        color="primary"
                        page={page}
                        total={pages}
                        onChange={(page) => setPage(page)}
                      />
                    </div>
                  }
                  classNames={{
                    wrapper: "min-h-[360px]",
                  }}
                >
                  <TableHeader>
                    <TableColumn>No</TableColumn>
                    <TableColumn>Tanggal</TableColumn>
                    <TableColumn>Diagnosa</TableColumn>
                    <TableColumn>Penanganan</TableColumn>
                    <TableColumn>Aksi</TableColumn>
                  </TableHeader>
                  <TableBody items={items} emptyContent={"Tidak Ada Riwayat"}>
                    {items.map((item, index) => (
                      <TableRow key={item.id}>
                        <TableCell>
                          {(page - 1) * rowsPerPage + index + 1}
                        </TableCell>
                        <TableCell>
                          {formatDate(item.tanggal_pemeriksaan)}
                        </TableCell>
                        <TableCell className="text-ellipsis overflow-hidden whitespace-nowrap max-w-xs">
                          {item.assessment}
                        </TableCell>
                        <TableCell>
                          {item.penggunaan_obat && item.resep
                            ? "Diberikan Obat dan Resep"
                            : item.penggunaan_obat
                            ? "Diberikan Obat"
                            : item.resep
                            ? "Diberikan Resep"
                            : "Tidak Ada Penanganan"}
                        </TableCell>
                        <TableCell>
                          <ModalDetailRiwayatPasien data={items[index]} />
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </ModalBody>
              <ModalFooter>
                <Button onPress={onClose} className="text-white bg-indigo-500">
                  Tutup
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
};
