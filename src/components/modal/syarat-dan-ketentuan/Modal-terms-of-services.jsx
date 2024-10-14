import React from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
  Checkbox,
} from "@nextui-org/react";

export const TermsOfServices = ({ isAgree, setIsAgree }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const handleAgree = () => {
    setIsAgree(true);
    onClose();
  };

  const handleDisagree = () => {
    setIsAgree(false);
    onClose();
  };

  return (
    <>
      <Checkbox isSelected={isAgree} onChange={onOpen}>
        <p className="text-sm text-slate-700 font-medium">
          Saya setuju dengan Syarat dan Ketentuan yang ada
        </p>
      </Checkbox>

      <Modal
        radius="sm"
        isOpen={isOpen}
        onClose={onClose}
        isDismissable={false}
        isKeyboardDismissDisabled={true}
        placement="center"
        className="mx-5"
      >
        <ModalContent className="bg-white rounded-lg shadow-lg max-h-[80vh]">
          <ModalHeader className="text-xl font-bold text-center text-gray-800">
            Syarat dan Ketentuan
          </ModalHeader>

          <ModalBody className="modal-body p-6 text-gray-700 overflow-y-auto max-h-[60vh]">
            <div className="space-y-4">
              <p>
                <strong className="font-medium">
                  Syarat dan Ketentuan Pendaftaran Akun
                </strong>
                <br />
                Dengan mendaftar sebagai pengguna pada platform reservasi
                praktek dokter spesialis, Anda setuju untuk mematuhi dan terikat
                oleh syarat dan ketentuan berikut:
              </p>

              <ol className="list-decimal list-outside space-y-4 pl-6">
                <li>
                  <strong>Informasi Akun</strong>
                  <ul className="list-disc list-outside pl-6 space-y-2 mt-2">
                    <li>
                      Anda setuju untuk memberikan informasi yang akurat,
                      terkini, dan lengkap selama proses pendaftaran. Data yang
                      salah atau tidak lengkap dapat mengakibatkan penangguhan
                      atau penghentian akun Anda.
                    </li>
                    <li>
                      Anda bertanggung jawab untuk menjaga kerahasiaan kata
                      sandi akun dan segala aktivitas yang terjadi di bawah akun
                      Anda.
                    </li>
                  </ul>
                </li>

                <li>
                  <strong>Penggunaan Layanan</strong>
                  <ul className="list-disc list-outside pl-6 space-y-2 mt-2">
                    <li>
                      Akun Anda digunakan untuk membuat reservasi dengan dokter
                      spesialis melalui platform ini. Penggunaan untuk tujuan
                      melanggar hukum atau kebijakan platform dilarang.
                    </li>
                    <li>
                      Memalsukan identitas atau mengklaim sebagai pihak lain
                      dalam penggunaan akun tidak diperkenankan.
                    </li>
                  </ul>
                </li>

                <li>
                  <strong>
                    Pengiriman Informasi melalui SMS dan/atau Email
                  </strong>
                  <ul className="list-disc list-outside pl-6 space-y-2 mt-2">
                    <li>
                      Informasi terkait reservasi, perubahan jadwal, atau
                      pemberitahuan penting lainnya dapat dikirim melalui SMS
                      dan/atau email.
                    </li>
                    <li>
                      Keterlambatan pengiriman informasi dapat terjadi karena
                      faktor teknis atau pihak ketiga.
                    </li>
                  </ul>
                </li>

                <li>
                  <strong>Tanggung Jawab Pengguna</strong>
                  <ul className="list-disc list-outside pl-6 space-y-2 mt-2">
                    <li>
                      Anda bertanggung jawab atas semua aktivitas di akun Anda.
                    </li>
                    <li>
                      Dilarang menyebarkan informasi tidak benar, menyesatkan,
                      atau merugikan pihak lain saat menggunakan layanan kami.
                    </li>
                  </ul>
                </li>

                <li>
                  <strong>Perubahan Syarat dan Ketentuan</strong>
                  <ul className="list-disc list-outside pl-6 space-y-2 mt-2">
                    <li>
                      Kami berhak mengubah syarat dan ketentuan ini kapan saja
                      tanpa pemberitahuan sebelumnya.
                    </li>
                    <li>
                      Pengguna diharapkan memeriksa syarat dan ketentuan secara
                      berkala.
                    </li>
                  </ul>
                </li>

                <li>
                  <strong>Bantuan dan Dukungan</strong>
                  <p className="mt-2">
                    Jika mengalami kesulitan, hubungi tim dukungan kami via
                    WhatsApp di{" "}
                    <span className="font-medium">
                      082137049037 (WhatsApp Only)
                    </span>
                    . Kami akan berusaha memberikan bantuan secepat mungkin.
                  </p>
                </li>
              </ol>
            </div>
          </ModalBody>

          <ModalFooter className="flex justify-end gap-4 px-6 py-4">
            <Button
              className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md"
              onClick={handleDisagree}
            >
              Tidak Setuju
            </Button>
            <Button
              color="primary"
              className="px-4 py-2 rounded-md"
              onClick={handleAgree}
            >
              Setuju
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};
